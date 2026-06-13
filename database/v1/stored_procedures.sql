-- Standard return code convention
-- 0 = Success
-- 1 = General error
-- 2 = Record not found
-- 3 = Validation failed
-- 4 = Permission denied
-- 5 = Constraint violation


/*

update oporations should be performed by dapper 
it is more easy to write sp for each one

*/
USE BankSystemV1;
GO

-- login user with email and password
CREATE procedure usp_LoginWithEmailPass
    @Email varchar(100),
    @Password varchar(100)
as
begin
    DECLARE @Login INT = 1;

    SELECT @Login = 0
    FROM customer.customer
    WHERE email = @Email AND password_hash = HASHBYTES('SHA2_256',@Password)

    SELECT @Login = 0
    FROM staff.staff
    WHERE email = @Email AND password_hash = HASHBYTES('SHA2_256',@Password)

    -- if login is 0 the login is successfull
    RETURN @Login;
END;
GO

-- create an individual customer
CREATE PROCEDURE usp_CreateIndividualCustomer
    @CustomerType VARCHAR(20) = 'individual',
    @Phone VARCHAR(20),
    @Email VARCHAR(100),
    @Password VARCHAR(100),
    @Status VARCHAR(20) = 'active',
    @FirstName VARCHAR(60),
    @LastName VARCHAR(60),
    @BirthDate DATE,
    @SSN VARCHAR(15),
    @Occupation VARCHAR(50),
    @Address VARCHAR(256)
AS
BEGIN
    BEGIN TRY;
        BEGIN TRANSACTION;

    INSERT into customer.customer
        (customer_type,phone,email,password_hash,[status])
    VALUES
        (@CustomerType, @Phone, @Email, HASHBYTES('SHA2_256', @Password), @Status)

    DECLARE @CustId INT = 0;
    SELECT
        @CustId = customer_id
    from customer.customer
    WHERE email = @Email AND password_hash = HASHBYTES('SHA2_256',@Password)

    IF @CustId = 0 
    BEGIN
        ROLLBACK TRANSACTION;
        RETURN 1;
    END

    INSERT into customer.individual_customer
        (customer_id,first_name,last_name,birth_date,ssn,occupation,address)
    VALUES
        (@CustId, @FirstName, @LastName, @BirthDate, HASHBYTES('SHA2_256', @SSN), @Occupation, @Address)
    
    COMMIT TRANSACTION;
    -- success
    RETURN 0;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT>0
            ROLLBACK TRANSACTION;
        THROW;
    end CATCH
END;
GO

-- get and individual customer with cust id
CREATE PROCEDURE usp_GetIndCustomer
    @CustId INT
AS
BEGIN

    SELECT *
    FROM customer.customer c
        JOIN customer.individual_customer cc on cc.customer_id = c.customer_id
    WHERE c.customer_id = @CustId AND c.customer_type = 'individual'

END;
GO

-- delete an ind customer
CREATE PROCEDURE usp_DelIndCustomer
    @CustId INT
AS
BEGIN

    IF EXISTS(
          SELECT 1
    FROM customer.customer c
        JOIN customer.individual_customer cc on cc.customer_id = c.customer_id
    WHERE c.customer_id = @CustId AND c.customer_type = 'individual'
    )
    BEGIN

        BEGIN TRANSACTION;
        DELETE FROM customer.customer
        WHERE 	customer_id = @CustId

        DELETE from customer.individual_customer
        where customer_id = @CustId

        COMMIT TRANSACTION;

    END
END;
GO


-- delete an org customer
CREATE PROCEDURE usp_DelOrgCustomer
    @CustId INT
AS
BEGIN

    IF EXISTS(
          SELECT 1
    FROM customer.customer c
        JOIN customer.organization_customer cc on cc.customer_id = c.customer_id
    WHERE c.customer_id = @CustId AND c.customer_type = 'organization'
    )
    BEGIN

        BEGIN TRANSACTION;
        DELETE FROM customer.customer
        WHERE 	customer_id = @CustId

        DELETE from customer.organization_customer
        where customer_id = @CustId

        COMMIT TRANSACTION;

    END
END;
GO


-- create an orgonization customer
CREATE PROCEDURE usp_CreateOrgCustomer
    @CustomerType VARCHAR(20) = 'organization',
    @Phone VARCHAR(20),
    @Email VARCHAR(100),
    @Password VARCHAR(100),
    @Status VARCHAR(20) = 'active',
    @OrgName VARCHAR(100),
    @RegNum VARCHAR(100),
    @FoundDate DATE = NULL,
    @Industry VARCHAR(50) = '',
    @HqAddr VARCHAR(256) = '',
    @ContPersonId INT = NULL,
    @CeoSsn VARCHAR(15)
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;

    INSERT into customer.customer
        (customer_type,phone,email,password_hash,[status])
    VALUES
        (@CustomerType, @Phone, @Email, HASHBYTES('SHA2_256', @Password), @Status)

    DECLARE @CustId INT = 0;

    SELECT @CustId = customer_id
    from customer.customer
    WHERE email = @Email AND password_hash = HASHBYTES('SHA2_256',@Password)

    IF @CustId = 0 
    BEGIN
        ROLLBACK TRANSACTION;
        RETURN 1;
    END

    INSERT into customer.organization_customer
        (customer_id,organization_name,registration_number,founded_date,industry,headquarters_address)
    VALUES(
            @CustId, @OrgName, HASHBYTES('SHA2_256', @RegNum), @FoundDate, @Industry, @HqAddr
    )

    COMMIT TRANSACTION;
    -- success
    RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            THROW;
    END CATCH

END;
GO


-- get customer generic customer info
CREATE PROCEDURE usp_GetCust
    @CustId INT
AS
BEGIN
    SELECT
        c.customer_type,
        c.email,
        c.phone,
        c.created_at,
        c.[status],
        c.updated_at
    FROM customer.customer c
    WHERE c.customer_id = @CustId
END;
GO


-- change customer status
CREATE PROCEDURE usp_PatchCustStatus
    @CustId INT,
    @Status VARCHAR(20) = 'suspend'
AS
BEGIN

    UPDATE customer.customer
    SET
        [status] = @Status
    WHERE customer_id = @CustId

END;
GO

-- get all customer accounts
CREATE PROCEDURE usp_GetCustAcc
    @CustId INT,
    @Status VARCHAR(20) = NULL,
    @Type VARCHAR(20) = NULL
AS
BEGIN

    SELECT
        *
    FROM account.account_owner a
        JOIN account.account ac on ac.account_id = a.account_id
    WHERE a.customer_id = @CustId AND (@Status is null OR a.[status] = @Status) AND (@Type is null or a.ownership_type = @Type)
END;
GO

-- create new account for a customer
CREATE PROCEDURE usp_CreatAcc
    @CustId INT,
    @AccNumber CHAR(16),
    @CurrencyId INT,
    @AccType VARCHAR(20),
    @Balance DECIMAL(18,2) = 0,
    @AccStatus VARCHAR(20)
AS
BEGIN
    BEGIN TRY
    BEGIN TRANSACTION;


    -- create account first
    INSERT into account.account
        (account_number,currency_id,account_type,balance,account_status)
    VALUES(
            @AccNumber, @CurrencyId, @AccType, @Balance, @AccStatus
    )

    DECLARE @AccId INT = 0;
    SELECT
        @AccId = account_id
    FROM account.account
    WHERE account_number = @AccNumber

    IF @AccId = 0
    BEGIN
        RAISERROR('Account did not created', 16, 1);
    END

    -- create account owner ship and set it for customer
    INSERT into account.account_owner
        (
        account_id,customer_id,ownership_type,[status]
        )
    VALUES(
            @AccId, @CustId, 'primary', 'active'
    )

    COMMIT TRANSACTION;
    -- success
    RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            THROW;
    END CATCH

END;
GO

-- get balance of the account id
CREATE PROCEDURE usp_GetAccBal
    @AccId INT
AS
BEGIN
    SELECT account_number, balance
    FROM account.account
    WHERE account_id = @AccId
END
GO

-- remove and owener from an account
CREATE PROCEDURE usp_RemOwnAcc
    @CustId INT,
    @AccId INT
AS
BEGIN
    DECLARE @Type VARCHAR(20);
    SELECT @Type = ownership_type
    FROM account.account_owner
    WHERE account_id = @AccId AND customer_id = @CustId

    IF @Type = 'primary'
    BEGIN
        RAISERROR('primary ownership cant be removed',16,1);
    END

    DELETE account.account_owner WHERE account_id = @AccId AND customer_id = @CustId

END
GO


-- set account owern ship
CREATE PROCEDURE usp_SetAccOwnShip
    @CustId INT,
    @AccId INT,
    @OwnType VARCHAR(20) = 'primary'
AS
BEGIN

    BEGIN TRY
    BEGIN TRANSACTION;

        -- if there is only one owner it should remain one
        DECLARE @OwnCount INT = 0;

        SELECT
        @OwnCount = COUNT(customer_id)
    FROM account.account_owner a
    WHERE account_id = @AccId 

        -- owner count is one or less owner remain primary
        IF @OwnCount < 2
        BEGIN
        ROLLBACK TRANSACTION;
        RETURN 3;
    END

    UPDATE account.account_owner
    SET ownership_type = @OwnType
    WHERE customer_id = @CustId AND account_id = @AccId

    COMMIT TRANSACTION;
    -- success
    RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            THROW;
    END CATCH

END;
GO

-- create new branch
CREATE PROCEDURE usp_CreateBrnch
    @BrnchCode VARCHAR(20),
    @BrnchName VARCHAR(100),
    @City VARCHAR(50),
    @Addr VARCHAR(256),
    @EstabDate DATE
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO branch.branch
        (branch_code,branch_name,city,address,establish_date)
    VALUES
        (
            @BrnchCode, @BrnchName, @City, @Addr, @EstabDate
        )

        COMMIT TRANSACTION;
        -- sucess
        RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            THROW;

    END CATCH
END;
GO

-- create new staff
CREATE PROCEDURE usp_CreateStaff
    @Fname VARCHAR(60),
    @Lname VARCHAR(60),
    @SSN VARCHAR(15) ,
    @Email VARCHAR(100),
    @Phone VARCHAR(20),
    @Password VARCHAR(256),
    @Role VARCHAR(20),
    @Addr VARCHAR(256),
    @HirDate DATE,
    @TerminDate DATE = NULL,
    @BrnchId INT = 1
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO staff.staff
        (first_name,last_name,ssn,email,phone,password_hash,role,address,hire_date,termination_date,branch_id)
    VALUES
        (
            @Fname, @Lname, HASHBYTES('SHA2_256', @SSN), @Email, @Phone, HASHBYTES('SHA2_256', @Password), @Role, @Addr, @HirDate, @TerminDate, @BrnchId
        )

        COMMIT TRANSACTION;
        -- sucess
        RETURN 0;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
            THROW;

    END CATCH
END;
GO

-- update branch of staff
CREATE PROCEDURE usp_UpdateBrnchStaff
    @StaffId INT,
    @BrnchId INT
AS
BEGIN

    BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE staff.staff
    SET branch_id = @BrnchId
    WHERE staff_id = @StaffId

    COMMIT TRANSACTION;
    -- sucess
    RETURN 0;

    END TRY
    BEGIN CATCH 
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH

END;
GO

-- create new card
CREATE PROCEDURE usp_CreateCard
    @CardNum CHAR(16),
    @AccId INT,
    @ExpDate DATE,
    @Cvv2 VARCHAR(4)
AS
BEGIN
    BEGIN TRY

    BEGIN TRANSACTION;

    INSERT into card.card
        (
        card_number,account_id,expire_date,cvv2
        )

    VALUES(
            @CardNum, @AccId, @ExpDate, HASHBYTES('SHA_256',@Cvv2)
    )
    COMMIT TRANSACTION;

    RETURN 0;

    END TRY
    BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH

END;
GO

-- create new atm
CREATE PROCEDURE usp_CreateAtm
    @BrnchId int = NULL,
    @City VARCHAR(50),
    @Addr VARCHAR(256),
    @EstabDate DATE
AS
BEGIN
    BEGIN TRY

    BEGIN TRANSACTION;

    INSERT into atm.atm
        (
        branch_id,city,address,establish_date
        )
    VALUES
        (
            @BrnchId, @City, @Addr, @EstabDate
    )

    COMMIT TRANSACTION;

    RETURN 0;

    END TRY
    BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
        THROW;

    END CATCH
END;
GO

-- set a atm cash for an atm
CREATE PROCEDURE usp_CreateAtmCash
    @AtmId INT,
    @CurrencyId INT,
    @Amount DECIMAL(18,2)
AS
BEGIN

    IF EXISTS(
        SELECT 1
    FROM atm.atm_cash
    WHERE atm_id = @AtmId AND currency_id = @CurrencyId
    )
    BEGIN
        UPDATE atm.atm_cash
        SET amount = amount + @Amount
        WHERE currency_id = @CurrencyId AND atm_id = @AtmId

        RETURN 0;
    END

    INSERT into atm.atm_cash
        (
        atm_id,currency_id,amount
        )
    VALUES
        (
            @AtmId, @CurrencyId, @Amount
    )

END;
GO

-- create a new registered device
CREATE PROCEDURE usp_CreateRegDevice
    @CustId INT,
    @DvcId INT
AS
BEGIN
    BEGIN try
    BEGIN TRANSACTION;

    INSERT into device.registered_device
        (
        customer_id,device_id
        )
    VALUES
        (
            @CustId, @DvcId
    )

    COMMIT TRANSACTION;

    RETURN 0;

    END TRY
    BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
        THROW;

    END CATCH
END;
GO

-- create a check book
CREATE PROCEDURE usp_CreateCheckBook
    @AccId INT,
    @BrnchId INT,
    @CheckCount INT
AS
BEGIN
    BEGIN try
    BEGIN TRANSACTION;

    INSERT into cheque.checkbook
        (
        account_id,branch_id,number_of_checks
        )
    VALUES
        (
            @AccId, @BrnchId, @CheckCount
    )

    COMMIT TRANSACTION;

    RETURN 0;

    END TRY
    BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;
        THROW;

    END CATCH
END;
GO

-- creat a new check paper
CREATE PROCEDURE usp_CreateCheckPaper
    @ChckNumber VARCHAR(30),
    @ChckBkId INT,
    @ReciverAccId INT,
    @Amount DECIMAL(18,2),
    @ExpDate DATE,
    @Status VARCHAR(20) = 'issued'
AS
BEGIN

    INSERT into cheque.check_paper
        (
        check_number,checkbook_id,receiver_account_id,amount,expire_date,[status]
        )
    VALUES
        (
            @ChckNumber, @ChckBkId, @ReciverAccId, @Amount, @ExpDate, @Status
    )

END
GO

CREATE PROCEDURE usp_CreateLoan
    @AccId INT,
    @GrntCustId INT,
    @Amount DECIMAL(18,2),
    @IntRate DECIMAL(5,2),
    @LnTrmMonths INT,
    @RepyStat VARCHAR(20)
AS
BEGIN
    INSERT into loan.loan
        (
        account_id,guarantor_customer_id,amount,interest_rate,loan_term_months,repayment_status
        )
    VALUES
        (
            @AccId, @GrntCustId, @Amount, @IntRate, @LnTrmMonths, @RepyStat
        )

END
GO

-- create a new message for customer
CREATE PROCEDURE usp_CreateMsg
    @CustId INT,
    @Sbj VARCHAR(150),
    @Body NVARCHAR(MAX),
    @MsgStat VARCHAR(20) = 'unread'
AS
BEGIN

    INSERT into [message].[message]
        (
        customer_id,subject,body,message_status
        )
    VALUES
        (
            @CustId, @Sbj, @Body, @MsgStat
        )

END
GO

-- create new transaction
CREATE PROCEDURE usp_CreateTrx
    @RefCod VARCHAR(50),
    @SAccId INT NULL,
    @TAccId INT NULL,
    @SDvcId INT NULL,
    @TrxType VARCHAR(20) = 'transfer',
    @Amount DECIMAL(18,2),
    @TrxStat VARCHAR(20) = 'pending',
    @Desc VARCHAR(256) NULL
AS
BEGIN
    IF @TrxType != 'deposit'  
    BEGIN
        IF EXISTS(
        SELECT 1
        FROM account.account
        WHERE account_id = @SAccId AND @Amount > balance
    )
    BEGIN
            RAISERROR('balance is not enough for transfer',16,1);
        END
    END

    BEGIN TRANSACTION;

    IF @TrxType = 'transfer'
    BEGIN

        UPDATE account.account
        SET balance = balance - @Amount
        WHERE account_id = @SAccId

        UPDATE account.account
        SET balance = balance + @Amount
        WHERE account_id = @TAccId
    END
    IF @TrxType IN ('withdraw', 'purchase', 'bill_payment')
    BEGIN

        UPDATE account.account
        SET balance = balance - @Amount
        WHERE account_id = @SAccId

    END

    IF @TrxType = 'deposit'
    BEGIN
        UPDATE account.account
        SET balance = balance + @Amount
        WHERE account_id = @SAccId
    END

    INSERT into trx.transactions
        (
        reference_code,source_account_id,target_account_id,source_device_id,transaction_type,amount,transaction_status,[description],completed_at
        )
    VALUES
        (
            @RefCod, @SAccId, @TAccId, @SDvcId, @TrxType, @Amount, 'successful', @Desc, SYSDATETIME()
    )

    COMMIT TRANSACTION;

END
GO

-- get with trx id
CREATE PROCEDURE usp_GetTrxId
    @TrxId INT
AS
BEGIN
    SELECT *
    FROM trx.transactions
    WHERE transaction_id = @TrxId
END
GO