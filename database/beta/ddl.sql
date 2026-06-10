IF DB_ID('BankSystemV1') IS NOT NULL
BEGIN
    ALTER DATABASE BankSystemV1 SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE BankSystemRevised;
END;
GO

CREATE DATABASE BankSystemV1;
GO

USE BankSystemV1;
GO

/* =========================================================
   SCHEMAS
========================================================= */
CREATE SCHEMA security;
GO
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
CREATE SCHEMA payment;
GO
CREATE SCHEMA ledger;
GO

/* =========================================================
   SECURITY / AUDIT
========================================================= */
CREATE TABLE security.audit_log
(
    log_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    action_type VARCHAR(20) NOT NULL,
    performed_by_user_id INT NULL,
    performed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    details NVARCHAR(MAX) NULL
);
GO

CREATE TABLE security.entity_version
(
    version_id BIGINT IDENTITY(1,1) PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    entity_id BIGINT NOT NULL,
    version_no INT NOT NULL,
    changed_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    changed_by_user_id INT NULL,
    payload NVARCHAR(MAX) NOT NULL,
    CONSTRAINT UQ_entity_version UNIQUE (entity_type, entity_id, version_no)
);
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
    FOREIGN KEY(customer_id) REFERENCES customer(customer_id) ON DELETE NO ACTION
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
    -- pin_hash VARBINARY(256) NOT NULL,
    -- second_pin_hash VARBINARY(256) NULL,
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
    device_id INT NOT NULL UNIQUE,
    city VARCHAR(50) NOT NULL,
    address VARCHAR(256) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'maintenance')),
    establish_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
    CONSTRAINT FK_atm_branch
        FOREIGN KEY (branch_id)
        REFERENCES branch.branch(branch_id)
        ON DELETE SET NULL,
    CONSTRAINT FK_atm_device
        FOREIGN KEY (device_id)
        REFERENCES device.device(device_id)
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
   POS / REGISTERED DEVICE
========================================================= */

-- no need for pos (device with type 'pos')
-- CREATE TABLE device.pos
-- (
--     pos_id INT IDENTITY(1,1) PRIMARY KEY,
--     device_id INT NOT NULL UNIQUE,
--     customer_id INT NULL,
--     branch_id INT NULL,
--     register_address VARCHAR(256) NULL,
--     register_date DATE NOT NULL DEFAULT CAST(GETDATE() AS DATE),
--     status VARCHAR(20) NOT NULL DEFAULT 'active'
--         CHECK (status IN ('active', 'inactive', 'blocked')),
--     CONSTRAINT FK_pos_device
--         FOREIGN KEY (device_id)
--         REFERENCES device.device(device_id),
--     CONSTRAINT FK_pos_customer
--         FOREIGN KEY (customer_id)
--         REFERENCES customer.customer(customer_id)
--         ON DELETE SET NULL,
--     CONSTRAINT FK_pos_branch
--         FOREIGN KEY (branch_id)
--         REFERENCES branch.branch(branch_id)
--         ON DELETE SET NULL
-- );
-- GO

-- CREATE TABLE device.registered_device
-- (
--     registered_device_id INT IDENTITY(1,1) PRIMARY KEY,
--     customer_id INT NOT NULL,
--     device_id INT NOT NULL,
--     registered_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
--     status VARCHAR(20) NOT NULL DEFAULT 'active'
--         CHECK (status IN ('active', 'revoked')),
--     CONSTRAINT FK_registered_device_customer
--         FOREIGN KEY (customer_id)
--         REFERENCES customer.customer(customer_id)
--         ON DELETE NO ACTION,
--     CONSTRAINT FK_registered_device_device
--         FOREIGN KEY (device_id)
--         REFERENCES device.device(device_id)
--         ON DELETE NO ACTION,
--     CONSTRAINT UQ_registered_device UNIQUE (customer_id, device_id)
-- );
-- GO

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
        AND target_account_id IS NOT NULL
        AND device_id IS NULL)
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
        AND device_id IS NOT NULL
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
    -- drawer_account_id INT NOT NULL,
    -- payer_account_id INT NOT NULL,
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
    CONSTRAINT FK_check_paper_drawer_account
        FOREIGN KEY (drawer_account_id)
        REFERENCES account.account(account_id)
        ON DELETE NO ACTION,
    CONSTRAINT FK_check_paper_payer_account
        FOREIGN KEY (payer_account_id)
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
    loan_type VARCHAR(30) NOT NULL,
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


-- no need for facility
-- CREATE TABLE loan.facility
-- (
--     facility_id INT IDENTITY(1,1) PRIMARY KEY,
--     account_id INT NOT NULL,
--     facility_type VARCHAR(30) NOT NULL,
--     credit_limit DECIMAL(18,2) NOT NULL
--         CHECK (credit_limit > 0),
--     interest_rate DECIMAL(5,2) NOT NULL
--         CHECK (interest_rate >= 0 AND interest_rate <= 100),
--     period_months INT NOT NULL
--         CHECK (period_months > 0),
--     status VARCHAR(20) NOT NULL DEFAULT 'active'
--         CHECK (status IN ('active', 'suspended', 'closed')),
--     created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
--     CONSTRAINT FK_facility_account
--         FOREIGN KEY (account_id)
--         REFERENCES account.account(account_id)
--         ON DELETE NO ACTION
-- );
-- GO

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
   ONLINE PAYMENT
========================================================= */
-- CREATE TABLE payment.online_payment
-- (
--     online_payment_id INT IDENTITY(1,1) PRIMARY KEY,
--     customer_id INT NOT NULL,
--     amount DECIMAL(18,2) NOT NULL
--         CHECK (amount > 0),
--     reference_code VARCHAR(50) NOT NULL UNIQUE,
--     provider_name VARCHAR(100) NULL,
--     payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
--         CHECK (payment_status IN ('pending', 'successful', 'failed', 'reversed')),
--     created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
--     completed_at DATETIME2 NULL,
--     CONSTRAINT FK_online_payment_customer
--         FOREIGN KEY (customer_id)
--         REFERENCES customer.customer(customer_id)
--         ON DELETE NO ACTION
-- );
-- GO


/* =========================================================
   LEDGER
========================================================= */
-- CREATE TABLE ledger.ledger_account
-- (
--     ledger_account_id INT IDENTITY(1,1) PRIMARY KEY,
--     account_code VARCHAR(20) NOT NULL UNIQUE,
--     account_name VARCHAR(100) NOT NULL,
--     parent_ledger_account_id INT NULL,
--     status VARCHAR(20) NOT NULL DEFAULT 'active'
--         CHECK (status IN ('active', 'inactive')),
--     CONSTRAINT FK_ledger_account_parent
--         FOREIGN KEY (parent_ledger_account_id)
--         REFERENCES ledger.ledger_account(ledger_account_id)
--         ON DELETE NO ACTION
-- );
-- GO

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
   INDEXES
========================================================= */
CREATE INDEX IX_customer_status ON customer.customer(status);
GO

CREATE INDEX IX_individual_customer_ssn ON customer.individual_customer(ssn);
GO

CREATE INDEX IX_organization_customer_contact_person ON customer.organization_customer(contact_person_id);
GO

CREATE INDEX IX_staff_branch ON staff.staff(branch_id);
GO

CREATE INDEX IX_account_currency ON account.account(currency_id);
GO

CREATE INDEX IX_account_status ON account.account(account_status);
GO

CREATE INDEX IX_account_owner_customer ON account.account_owner(customer_id);
GO

CREATE INDEX IX_card_account ON card.card(account_id);
GO

CREATE INDEX IX_atm_branch ON atm.atm(branch_id);
GO

CREATE INDEX IX_atm_cash_currency ON atm.atm_cash(currency_id);
GO

CREATE INDEX IX_pos_branch ON device.pos(branch_id);
GO

CREATE INDEX IX_pos_customer ON device.pos(customer_id);
GO

CREATE INDEX IX_registered_device_customer ON device.registered_device(customer_id);
GO

CREATE INDEX IX_registered_device_device ON device.registered_device(device_id);
GO

CREATE INDEX IX_transactions_source ON trx.transactions(source_account_id);
GO

CREATE INDEX IX_transactions_target ON trx.transactions(target_account_id);
GO

CREATE INDEX IX_transactions_device ON trx.transactions(device_id);
GO

CREATE INDEX IX_transactions_status ON trx.transactions(transaction_status);
GO

CREATE INDEX IX_checkbook_account ON cheque.checkbook(account_id);
GO

CREATE INDEX IX_checkbook_branch ON cheque.checkbook(branch_id);
GO

CREATE INDEX IX_check_paper_checkbook ON cheque.check_paper(checkbook_id);
GO

CREATE INDEX IX_check_paper_drawer_account ON cheque.check_paper(drawer_account_id);
GO

CREATE INDEX IX_check_paper_payer_account ON cheque.check_paper(payer_account_id);
GO

CREATE INDEX IX_loan_account ON loan.loan(account_id);
GO

CREATE INDEX IX_loan_guarantor_customer ON loan.loan(guarantor_customer_id);
GO

CREATE INDEX IX_facility_account ON loan.facility(account_id);
GO

CREATE INDEX IX_message_customer ON message.message(customer_id);
GO

CREATE INDEX IX_online_payment_customer ON payment.online_payment(customer_id);
GO

CREATE INDEX IX_ledger_parent ON ledger.ledger_account(parent_ledger_account_id);
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
