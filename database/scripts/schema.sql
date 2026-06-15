CREATE DATABASE BankSystemV1;
GO

USE BankSystemV1;
GO

/* =========================================================
   SCHEMAS
========================================================= */
CREATE SCHEMA customer;
GO
CREATE SCHEMA branch;
GO
CREATE SCHEMA staff;
GO
CREATE SCHEMA currency;
GO
CREATE SCHEMA account;
GO
CREATE SCHEMA device;
GO
CREATE SCHEMA card;
GO
CREATE SCHEMA atm;
GO
CREATE SCHEMA trx;
GO
CREATE SCHEMA cheque;
GO
CREATE SCHEMA loan;
GO
CREATE SCHEMA message;
GO
CREATE SCHEMA ledger;
GO

/* =========================================================
   CUSTOMER
========================================================= */
CREATE TABLE customer.customer
(
    customer_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_type VARCHAR(20) NOT NULL
        CHECK (customer_type IN ('individual', 'organization')),
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARBINARY(256) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'suspended', 'closed', 'dormant')),
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO

CREATE TABLE customer.individual_customer
(
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    birth_date DATE NOT NULL,
    ssn VARBINARY(256) NOT NULL UNIQUE,
    occupation VARCHAR(50) NULL,
    address VARCHAR(256) NULL,
    CONSTRAINT FK_individual_customer_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer.customer(customer_id)
        ON DELETE NO ACTION,
    CONSTRAINT CK_individual_customer_birth_date
        CHECK (birth_date <= CAST(GETDATE() AS DATE)),
    CONSTRAINT CK_individual_customer_age
        CHECK (DATEDIFF(YEAR, birth_date, CAST(GETDATE() AS DATE)) >= 18)
);
GO

CREATE TABLE customer.organization_customer
(
    customer_id INT PRIMARY KEY,
    organization_name VARCHAR(100) NOT NULL,
    registration_number VARBINARY(256) NOT NULL UNIQUE,
    founded_date DATE NULL,
    industry VARCHAR(50) NULL,
    headquarters_address VARCHAR(256) NULL,
    contact_person_id INT NULL,
    ceo_ssn VARBINARY(256) NULL,
    CONSTRAINT FK_organization_customer_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer.customer(customer_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_organization_customer_contact_person
        FOREIGN KEY (contact_person_id)
        REFERENCES customer.individual_customer(customer_id)
        ON DELETE SET NULL,
    CONSTRAINT CK_organization_customer_founded_date
        CHECK (founded_date IS NULL OR founded_date <= CAST(GETDATE() AS DATE))
);
GO

/* =========================================================
   BRANCH
========================================================= */
CREATE TABLE branch.branch
(
    branch_id INT IDENTITY(1,1) PRIMARY KEY,
    branch_code VARCHAR(20) NOT NULL UNIQUE,
    branch_name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(256) NOT NULL,
    establish_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'closed', 'renovating'))
);
GO

/* =========================================================
   STAFF
========================================================= */
CREATE TABLE staff.staff
(
    staff_id INT IDENTITY(1,1) PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    ssn VARBINARY(256) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NULL UNIQUE,
    password_hash VARBINARY(256) NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('employee', 'manager', 'admin', 'teller', 'auditor')),
    address VARCHAR(256) NULL,
    hire_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    termination_date DATE NULL,
    branch_id INT NULL,
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'on_leave')),
    CONSTRAINT FK_staff_branch
        FOREIGN KEY (branch_id)
        REFERENCES branch.branch(branch_id)
        ON DELETE SET NULL
);
GO

/* =========================================================
   CURRENCY
========================================================= */
CREATE TABLE currency.currency
(
    currency_id INT IDENTITY(1,1) PRIMARY KEY,
    currency_code CHAR(3) NOT NULL UNIQUE,
    currency_name VARCHAR(50) NOT NULL,
    currency_symbol VARCHAR(5) NOT NULL,
    is_foreign BIT NOT NULL DEFAULT 0
);
GO

/* =========================================================
   ACCOUNT
   Ownership is normalized through account_owner only.
========================================================= */
CREATE TABLE account.account
(
    account_id INT IDENTITY(1,1) PRIMARY KEY,
    account_number CHAR(16) NOT NULL UNIQUE,
    currency_id INT NOT NULL,
    account_type VARCHAR(20) NOT NULL
        CHECK (account_type IN ('saving', 'current', 'business', 'loan_facility', 'investment')),
    balance DECIMAL(18,2) NOT NULL DEFAULT 0
        CHECK (balance >= 0),
    account_status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (account_status IN ('active', 'blocked', 'closed', 'dormant', 'pending_closure')),
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    updated_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    closed_at DATETIME2 NULL,
    CONSTRAINT FK_account_currency
        FOREIGN KEY (currency_id)
        REFERENCES currency.currency(currency_id),
    CONSTRAINT CK_account_closed_at
        CHECK (
            (account_status = 'closed' AND closed_at IS NOT NULL)
        OR (account_status <> 'closed' AND closed_at IS NULL)
        )
);
GO

CREATE TABLE account.account_owner
(
    account_id INT NOT NULL,
    customer_id INT NOT NULL,
    ownership_type VARCHAR(20) NOT NULL DEFAULT 'primary'
        CHECK (ownership_type IN ('primary', 'joint', 'authorized_signer', 'beneficiary')),
    assigned_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive')),
    PRIMARY KEY (account_id, customer_id),
    CONSTRAINT FK_account_owner_account
        FOREIGN KEY (account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_account_owner_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer.customer(customer_id)
        ON DELETE NO ACTION
);
GO

/* =========================================================
   DEVICE
========================================================= */
CREATE TABLE device.device
(
    device_id INT IDENTITY(1,1) PRIMARY KEY,
    device_type VARCHAR(20) NOT NULL
        CHECK (device_type IN ('ATM', 'POS', 'MOBILE_APP', 'WEB_BROWSER', 'TELLER_TERMINAL')),
    customer_id INT NULL,
    serial_number VARCHAR(100) NULL UNIQUE,
    device_identifier VARCHAR(100) NULL,
    registered_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    last_seen_at DATETIME2 NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'deactivated', 'maintenance')),
    CONSTRAINT FK_device_customer
    FOREIGN KEY(customer_id) REFERENCES customer.customer(customer_id) ON DELETE NO ACTION
);
GO

/* =========================================================
   CARD
========================================================= */
CREATE TABLE card.card
(
    card_id INT IDENTITY(1,1) PRIMARY KEY,
    card_number CHAR(16) NOT NULL UNIQUE,
    account_id INT NOT NULL UNIQUE,
    expire_date DATE NOT NULL,
    cvv2 VARBINARY(256) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'blocked', 'expired', 'cancelled')),
    issued_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_card_account
        FOREIGN KEY (account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT CK_card_expire_date
        CHECK (expire_date > CAST(GETDATE() AS DATE))
);
GO

/* =========================================================
   ATM
========================================================= */
CREATE TABLE atm.atm
(
    atm_id INT IDENTITY(1,1) PRIMARY KEY,
    branch_id INT NULL,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(256) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'maintenance')),
    establish_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    CONSTRAINT FK_atm_branch
        FOREIGN KEY (branch_id)
        REFERENCES branch.branch(branch_id)
        ON DELETE SET NULL,
);
GO

CREATE TABLE atm.atm_cash
(
    atm_id INT NOT NULL,
    currency_id INT NOT NULL,
    amount DECIMAL(18,2) NOT NULL DEFAULT 0
        CHECK (amount >= 0),
    PRIMARY KEY (atm_id, currency_id),
    CONSTRAINT FK_atm_cash_atm
        FOREIGN KEY (atm_id)
        REFERENCES atm.atm(atm_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_atm_cash_currency
        FOREIGN KEY (currency_id)
        REFERENCES currency.currency(currency_id)
);
GO


/* =========================================================
   TRANSACTIONS
========================================================= */
CREATE TABLE trx.transactions
(
    transaction_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    reference_code VARCHAR(50) NOT NULL UNIQUE,
    source_account_id INT NULL,
    target_account_id INT NULL,
    source_device_id INT NULL,
    transaction_type VARCHAR(20) NOT NULL
        CHECK (transaction_type IN ('transfer', 'withdraw', 'deposit', 'purchase', 'bill_payment')),
    amount DECIMAL(18,2) NOT NULL
        CHECK (amount > 0),
    transaction_status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (transaction_status IN ('pending', 'successful', 'failed', 'reversed')),
    description VARCHAR(256) NULL,
    issued_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    completed_at DATETIME2 NULL,
    CONSTRAINT FK_transactions_source_account
        FOREIGN KEY (source_account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_transactions_target_account
        FOREIGN KEY (target_account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_transactions_device
        FOREIGN KEY (source_device_id)
        REFERENCES device.device(device_id)
        ON DELETE NO ACTION,
    CONSTRAINT CK_transactions_self_transfer
        CHECK (source_account_id IS NULL
        OR target_account_id IS NULL
        OR source_account_id <> target_account_id),
    CONSTRAINT CK_transactions_type_structure
        CHECK
        (
            (transaction_type = 'transfer'
        AND source_account_id IS NOT NULL
        AND target_account_id IS NOT NULL)
        OR
        (transaction_type = 'withdraw'
        AND source_account_id IS NOT NULL
        AND target_account_id IS NULL)
        OR
        (transaction_type = 'deposit'
        AND source_account_id IS NULL
        AND target_account_id IS NOT NULL)
        OR
        (transaction_type = 'purchase'
        AND source_account_id IS NOT NULL
        AND target_account_id IS NULL)
        OR
        (transaction_type = 'bill_payment'
        AND source_account_id IS NOT NULL
        AND target_account_id IS NOT NULL)
        )
);
GO

/* =========================================================
   CHEQUE / CHECKBOOK
========================================================= */
CREATE TABLE cheque.checkbook
(
    checkbook_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    branch_id INT NOT NULL,
    issue_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    number_of_checks INT NOT NULL
        CHECK (number_of_checks > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'issued', 'cancelled', 'closed')),
    CONSTRAINT FK_checkbook_account
        FOREIGN KEY (account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_checkbook_branch
        FOREIGN KEY (branch_id)
        REFERENCES branch.branch(branch_id)
        ON DELETE NO ACTION
);
GO

CREATE TABLE cheque.check_paper
(
    check_id INT IDENTITY(1,1) PRIMARY KEY,
    check_number VARCHAR(30) NOT NULL UNIQUE,
    checkbook_id INT NOT NULL,
    receiver_account_id INT NOT NULL,
    amount DECIMAL(18,2) NOT NULL
        CHECK (amount > 0),
    issued_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    expire_date DATE NOT NULL,
    cleared_date DATE NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'issued'
        CHECK (status IN ('issued', 'cashed', 'bounced', 'cancelled')),
    CONSTRAINT FK_check_paper_checkbook
        FOREIGN KEY (checkbook_id)
        REFERENCES cheque.checkbook(checkbook_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_check_paper_receiver_account
        FOREIGN KEY (receiver_account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT CK_check_paper_expire_date
        CHECK (expire_date >= CAST(issued_at AS DATE))
);
GO

/* =========================================================
   LOAN / FACILITY
========================================================= */
CREATE TABLE loan.loan
(
    loan_id INT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    guarantor_customer_id INT NOT NULL,
    amount DECIMAL(18,2) NOT NULL
        CHECK (amount > 0),
    interest_rate DECIMAL(5,2) NOT NULL
        CHECK (interest_rate >= 0 AND interest_rate <= 100),
    loan_term_months INT NOT NULL
        CHECK (loan_term_months > 0),
    repayment_status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (repayment_status IN ('active', 'completed', 'defaulted')),
    issue_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    CONSTRAINT FK_loan_account
        FOREIGN KEY (account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_loan_guarantor_customer
        FOREIGN KEY (guarantor_customer_id)
        REFERENCES customer.customer(customer_id)
        ON DELETE NO ACTION
);
GO

/* =========================================================
   MESSAGE
========================================================= */
CREATE TABLE message.message
(
    message_id INT IDENTITY(1,1) PRIMARY KEY,
    customer_id INT NOT NULL,
    subject VARCHAR(150) NOT NULL,
    body NVARCHAR(MAX) NOT NULL,
    message_status VARCHAR(20) NOT NULL DEFAULT 'unread'
        CHECK (message_status IN ('unread', 'read', 'archived', 'deleted')),
    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    read_at DATETIME2 NULL,
    CONSTRAINT FK_message_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer.customer(customer_id)
        ON DELETE NO ACTION
);
GO

/* =========================================================
   HISTORICAL LEDGER / BALANCE TRACKING
========================================================= */
CREATE TABLE ledger.account_balance_history
(
    history_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    account_id INT NOT NULL,
    old_balance DECIMAL(18,2) NOT NULL,
    new_balance DECIMAL(18,2) NOT NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    changed_by_transaction_id BIGINT NULL,
    changed_by_user_id INT NULL,
    CONSTRAINT FK_balance_history_account
        FOREIGN KEY (account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION
);
GO

CREATE TABLE ledger.transaction_status_history
(
    history_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    transaction_id BIGINT NOT NULL,
    old_status VARCHAR(20) NOT NULL,
    new_status VARCHAR(20) NOT NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    changed_by_user_id INT NULL,
    note VARCHAR(256) NULL,
    CONSTRAINT FK_transaction_status_history_transaction
        FOREIGN KEY (transaction_id)
        REFERENCES trx.transactions(transaction_id)
        ON DELETE NO ACTION
);
GO

/* =========================================================
   OPTIONAL: TRIGGERS FOR AUDIT / HISTORY
   ========================================================= */
CREATE TRIGGER account.trg_account_balance_history
ON account.account
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ledger.account_balance_history
        (
        account_id,
        old_balance,
        new_balance,
        changed_at,
        changed_by_transaction_id,
        changed_by_user_id
        )
    SELECT
        d.account_id,
        d.balance,
        i.balance,
        SYSDATETIME(),
        NULL,
        NULL
    FROM inserted i
        INNER JOIN deleted d
        ON i.account_id = d.account_id
    WHERE ISNULL(i.balance, -1) <> ISNULL(d.balance, -1);
END;
GO

CREATE TRIGGER trx.trg_transaction_status_history
ON trx.transactions
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ledger.transaction_status_history
        (
        transaction_id,
        old_status,
        new_status,
        changed_at,
        changed_by_user_id,
        note
        )
    SELECT
        d.transaction_id,
        d.transaction_status,
        i.transaction_status,
        SYSDATETIME(),
        NULL,
        NULL
    FROM inserted i
        INNER JOIN deleted d
        ON i.transaction_id = d.transaction_id
    WHERE ISNULL(i.transaction_status, '') <> ISNULL(d.transaction_status, '');
END;
GO
