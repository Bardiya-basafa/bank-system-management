CREATE DATABASE BankSystem;
GO


USE BankSystem;
GO

/* =========================================================
   CUSTOMERS
========================================================= */

CREATE TABLE customer
(
    customer_id INT PRIMARY KEY IDENTITY,

    customer_type VARCHAR(20) NOT NULL
        CHECK (customer_type IN ('individual', 'organization')),

    phone VARCHAR(15) NOT NULL UNIQUE,

    email VARCHAR(100) NOT NULL UNIQUE,

    password_hash VARBINARY(256) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'suspended', 'closed')),

    created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);
GO


CREATE TABLE individual_customer
(
    customer_id INT PRIMARY KEY,

    first_name VARCHAR(60) NOT NULL,

    last_name VARCHAR(60) NOT NULL,

    birth_date DATE NOT NULL,

    ssn CHAR(10) NOT NULL UNIQUE,

    occupation VARCHAR(50),

    address VARCHAR(256),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);
GO


CREATE TABLE organization_customer
(
    customer_id INT PRIMARY KEY,

    organization_name VARCHAR(100) NOT NULL,

    registration_number VARCHAR(30) NOT NULL UNIQUE,

    founded_date DATE,

    industry VARCHAR(50),

    contact_person_id INT NULL,

    headquarters_address VARCHAR(256),

    ceo_ssn CHAR(10),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY(contact_person_id)
        REFERENCES individual_customer(customer_id)
        ON NO ACTION
);
GO


/* =========================================================
   BRANCHES
========================================================= */

CREATE TABLE branch
(
    branch_id INT PRIMARY KEY IDENTITY,

    branch_code VARCHAR(20) UNIQUE NOT NULL,

    branch_name VARCHAR(100) NOT NULL,

    city VARCHAR(50) NOT NULL,

    address VARCHAR(256) NOT NULL,

    establish_date DATE DEFAULT CAST(GETDATE() AS DATE),

    total_cash DECIMAL(18,2) DEFAULT 0
);
GO


/* =========================================================
   STAFF
========================================================= */

CREATE TABLE staff
(
    staff_id INT PRIMARY KEY IDENTITY,

    first_name VARCHAR(60) NOT NULL,

    last_name VARCHAR(60) NOT NULL,

    ssn CHAR(10) UNIQUE NOT NULL,

    email VARCHAR(100) UNIQUE NOT NULL,

    phone VARCHAR(15) UNIQUE,

    password_hash VARBINARY(256) NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK(role IN ('employee', 'manager', 'admin')),

    address VARCHAR(256),

    hire_date DATE DEFAULT CAST(GETDATE() AS DATE),

    termination_date DATE NULL,

    branch_id INT NULL,

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(branch_id)
        REFERENCES branch(branch_id)
        ON DELETE SET NULL
);
GO


/* =========================================================
   CURRENCIES
========================================================= */

CREATE TABLE currency
(
    currency_id INT PRIMARY KEY IDENTITY,

    currency_code CHAR(3) UNIQUE NOT NULL,

    currency_name VARCHAR(50) NOT NULL,

    currency_symbol VARCHAR(5) NOT NULL,

    is_foreign BIT DEFAULT 0
);
GO


/* =========================================================
   ACCOUNTS
========================================================= */

CREATE TABLE account
(
    account_id INT PRIMARY KEY IDENTITY,

    account_number CHAR(16) UNIQUE NOT NULL,

    customer_id INT NOT NULL,

    currency_id INT NOT NULL,

    account_type VARCHAR(20) NOT NULL
        CHECK(account_type IN ('saving', 'current', 'business')),

    balance DECIMAL(18,2) NOT NULL DEFAULT 0
        CHECK(balance >= 0),

    account_status VARCHAR(20) DEFAULT 'active'
        CHECK(account_status IN ('active', 'blocked', 'closed')),

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY(currency_id)
        REFERENCES currency(currency_id)
);
GO


/* =========================================================
   DEVICES
========================================================= */

CREATE TABLE device
(
    device_id INT PRIMARY KEY IDENTITY,

    device_type VARCHAR(20) NOT NULL
        CHECK(device_type IN ('ATM', 'POS', 'MOBILE', 'WEB')),

    serial_number VARCHAR(100) UNIQUE,

    created_at DATETIME2 DEFAULT SYSDATETIME()
);
GO


/* =========================================================
   CARDS
========================================================= */

CREATE TABLE card
(
    card_id INT PRIMARY KEY IDENTITY,

    card_number CHAR(16) UNIQUE NOT NULL,

    account_id INT NOT NULL UNIQUE,

    expire_date DATE NOT NULL,

    cvv2 CHAR(4) NOT NULL,

    pin_hash VARBINARY(256) NOT NULL,

    second_pin_hash VARBINARY(256),

    status VARCHAR(20) DEFAULT 'active'
        CHECK(status IN ('active', 'blocked', 'expired')),

    issued_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(account_id)
        REFERENCES account(account_id)
        ON DELETE CASCADE
);
GO


/* =========================================================
   ATM
========================================================= */

CREATE TABLE atm
(
    atm_id INT PRIMARY KEY IDENTITY,

    branch_id INT NULL,

    device_id INT UNIQUE NOT NULL,

    city VARCHAR(50),

    address VARCHAR(256),

    status VARCHAR(20) DEFAULT 'active',

    establish_date DATE DEFAULT CAST(GETDATE() AS DATE),

    FOREIGN KEY(branch_id)
        REFERENCES branch(branch_id)
        ON DELETE SET NULL,

    FOREIGN KEY(device_id)
        REFERENCES device(device_id)
);
GO


CREATE TABLE atm_cash
(
    atm_id INT,

    currency_id INT,

    amount DECIMAL(18,2) DEFAULT 0,

    PRIMARY KEY(atm_id, currency_id),

    FOREIGN KEY(atm_id)
        REFERENCES atm(atm_id)
        ON DELETE CASCADE,

    FOREIGN KEY(currency_id)
        REFERENCES currency(currency_id)
);
GO


/* =========================================================
   POS
========================================================= */

CREATE TABLE pos
(
    pos_id INT PRIMARY KEY IDENTITY,

    device_id INT UNIQUE NOT NULL,

    customer_id INT NULL,

    branch_id INT NULL,

    register_address VARCHAR(256),

    register_date DATE DEFAULT CAST(GETDATE() AS DATE),

    status VARCHAR(20) DEFAULT 'active',

    FOREIGN KEY(device_id)
        REFERENCES device(device_id),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id),

    FOREIGN KEY(branch_id)
        REFERENCES branch(branch_id)
);
GO


/* =========================================================
   REGISTERED CUSTOMER DEVICES
========================================================= */

CREATE TABLE registered_device
(
    registered_device_id INT PRIMARY KEY IDENTITY,

    customer_id INT NOT NULL,

    device_id INT NOT NULL,

    imei VARCHAR(50) NOT NULL UNIQUE,

    os VARCHAR(50),

    auth_status VARCHAR(20) DEFAULT 'authorized'
        CHECK(auth_status IN ('authorized', 'blocked')),

    registered_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY(device_id)
        REFERENCES device(device_id)
);
GO


/* =========================================================
   TRANSACTIONS
========================================================= */

CREATE TABLE transactions
(
    transaction_id BIGINT PRIMARY KEY IDENTITY,

    reference_code VARCHAR(50) UNIQUE NOT NULL,

    source_account_id INT NOT NULL,

    target_account_id INT NULL,

    device_id INT NULL,

    transaction_type VARCHAR(20) NOT NULL
        CHECK(transaction_type IN
        (
            'transfer',
            'withdraw',
            'deposit',
            'purchase',
            'bill_payment'
        )),

    amount DECIMAL(18,2) NOT NULL
        CHECK(amount > 0),

    transaction_status VARCHAR(20) DEFAULT 'pending'
        CHECK(transaction_status IN
        (
            'pending',
            'successful',
            'failed',
            'reversed'
        )),

    description VARCHAR(256),

    issued_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(source_account_id)
        REFERENCES account(account_id),

    FOREIGN KEY(target_account_id)
        REFERENCES account(account_id),

    FOREIGN KEY(device_id)
        REFERENCES device(device_id)
);
GO


/* =========================================================
   CHECKBOOKS
========================================================= */

CREATE TABLE checkbook
(
    checkbook_id INT PRIMARY KEY IDENTITY,

    account_id INT NOT NULL,

    branch_id INT NOT NULL,

    issue_date DATE DEFAULT CAST(GETDATE() AS DATE),

    number_of_checks INT NOT NULL,

    status VARCHAR(20) DEFAULT 'active',

    FOREIGN KEY(account_id)
        REFERENCES account(account_id),

    FOREIGN KEY(branch_id)
        REFERENCES branch(branch_id)
);
GO


CREATE TABLE check_paper
(
    check_id INT PRIMARY KEY IDENTITY,

    check_number VARCHAR(30) UNIQUE NOT NULL,

    checkbook_id INT NOT NULL,

    drawer_account_id INT NOT NULL,

    payer_account_id INT NOT NULL,

    amount DECIMAL(18,2) NOT NULL,

    issued_at DATETIME2 DEFAULT SYSDATETIME(),

    expire_date DATE NOT NULL,

    cleared_date DATE NULL,

    status VARCHAR(20) DEFAULT 'issued'
        CHECK(status IN
        (
            'issued',
            'cashed',
            'bounced',
            'cancelled'
        )),

    FOREIGN KEY(checkbook_id)
        REFERENCES checkbook(checkbook_id),

    FOREIGN KEY(drawer_account_id)
        REFERENCES account(account_id),

    FOREIGN KEY(payer_account_id)
        REFERENCES account(account_id)
);
GO


/* =========================================================
   LOANS
========================================================= */

CREATE TABLE loan
(
    loan_id INT PRIMARY KEY IDENTITY,

    account_id INT NOT NULL,

    guarantor_customer_id INT NOT NULL,

    loan_type VARCHAR(30) NOT NULL,

    amount DECIMAL(18,2) NOT NULL,

    interest_rate DECIMAL(5,2) NOT NULL,

    loan_term_months INT NOT NULL,

    repayment_status VARCHAR(20) DEFAULT 'active'
        CHECK(repayment_status IN
        (
            'active',
            'completed',
            'defaulted'
        )),

    issue_date DATE DEFAULT CAST(GETDATE() AS DATE),

    FOREIGN KEY(account_id)
        REFERENCES account(account_id),

    FOREIGN KEY(guarantor_customer_id)
        REFERENCES customer(customer_id)
);
GO


/* =========================================================
   FACILITIES
========================================================= */

CREATE TABLE facility
(
    facility_id INT PRIMARY KEY IDENTITY,

    account_id INT NOT NULL,

    facility_type VARCHAR(30) NOT NULL,

    credit_limit DECIMAL(18,2) NOT NULL,

    interest_rate DECIMAL(5,2) NOT NULL,

    terms VARCHAR(256),

    guarantees VARCHAR(256),

    period_months INT,

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(account_id)
        REFERENCES account(account_id)
);
GO


/* =========================================================
   MESSAGES
========================================================= */

CREATE TABLE message
(
    message_id INT PRIMARY KEY IDENTITY,

    customer_id INT NOT NULL,

    subject VARCHAR(100),

    content VARCHAR(1000),

    status VARCHAR(20) DEFAULT 'not-delivered'
        CHECK(status IN
        (
            'not-delivered',
            'delivered',
            'read'
        )),

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);
GO


/* =========================================================
   ONLINE PAYMENTS
========================================================= */

CREATE TABLE online_payment
(
    online_payment_id INT PRIMARY KEY IDENTITY,

    customer_id INT NOT NULL,

    payment_type VARCHAR(30),

    gateway_url VARCHAR(256),

    protocol VARCHAR(30),

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);
GO

CREATE TABLE account_owner
(
    account_id INT NOT NULL,
    customer_id INT NOT NULL,

    ownership_type VARCHAR(20) DEFAULT 'primary'
        CHECK (ownership_type IN ('primary','joint','authorized')),

    PRIMARY KEY(account_id, customer_id),

    FOREIGN KEY(account_id)
        REFERENCES account(account_id)
        ON DELETE CASCADE,

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
)
GO

CREATE TABLE ledger_account
(
    ledger_account_id INT PRIMARY KEY IDENTITY,

    account_code VARCHAR(20) UNIQUE NOT NULL,

    name VARCHAR(100) NOT NULL,

    account_type VARCHAR(20)
        CHECK (account_type IN ('asset','liability','income','expense','equity')),

    created_at DATETIME2 DEFAULT SYSDATETIME()
)
GO

CREATE TABLE ledger_entry
(
    entry_id BIGINT PRIMARY KEY IDENTITY,

    transaction_id BIGINT NOT NULL,

    ledger_account_id INT NOT NULL,

    debit DECIMAL(18,2) DEFAULT 0,

    credit DECIMAL(18,2) DEFAULT 0,

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE,

    FOREIGN KEY(ledger_account_id)
        REFERENCES ledger_account(ledger_account_id)
)
GO

CREATE TABLE exchange_rate
(
    rate_id INT PRIMARY KEY IDENTITY,

    from_currency_id INT NOT NULL,

    to_currency_id INT NOT NULL,

    rate DECIMAL(18,6) NOT NULL,

    effective_date DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(from_currency_id)
        REFERENCES currency(currency_id),

    FOREIGN KEY(to_currency_id)
        REFERENCES currency(currency_id)
);
GO


CREATE TABLE fee
(
    fee_id INT PRIMARY KEY IDENTITY,

    fee_name VARCHAR(50),

    amount DECIMAL(18,2),

    fee_type VARCHAR(20)
        CHECK (fee_type IN ('fixed','percentage'))
);
GO

CREATE TABLE transaction_fee
(
    transaction_id BIGINT,
    fee_id INT,

    charged_amount DECIMAL(18,2),

    PRIMARY KEY(transaction_id, fee_id),

    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE,

    FOREIGN KEY(fee_id)
        REFERENCES fee(fee_id)
);
GO

CREATE TABLE card_limit
(
    card_id INT PRIMARY KEY,

    daily_withdraw_limit DECIMAL(18,2),

    daily_purchase_limit DECIMAL(18,2),

    monthly_limit DECIMAL(18,2),

    FOREIGN KEY(card_id)
        REFERENCES card(card_id)
        ON DELETE CASCADE
);
GO


CREATE TABLE card_transaction
(
    card_transaction_id BIGINT PRIMARY KEY IDENTITY,

    card_id INT NOT NULL,

    transaction_id BIGINT NOT NULL,

    merchant_name VARCHAR(100),

    merchant_city VARCHAR(50),

    merchant_country VARCHAR(50),

    FOREIGN KEY(card_id)
        REFERENCES card(card_id),

    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
);
GO

CREATE TABLE branch_cash
(
    branch_id INT,
    currency_id INT,
    amount DECIMAL(18,2),

    PRIMARY KEY(branch_id,currency_id),

    FOREIGN KEY(branch_id)
        REFERENCES branch(branch_id)
        ON DELETE CASCADE,

    FOREIGN KEY(currency_id)
        REFERENCES currency(currency_id)
);
GO

CREATE TABLE loan_installment
(
    installment_id INT PRIMARY KEY IDENTITY,

    loan_id INT NOT NULL,

    installment_number INT,

    due_date DATE,

    principal_amount DECIMAL(18,2),

    interest_amount DECIMAL(18,2),

    paid_amount DECIMAL(18,2) DEFAULT 0,

    status VARCHAR(20) DEFAULT 'pending'
        CHECK(status IN ('pending','paid','late')),

    FOREIGN KEY(loan_id)
        REFERENCES loan(loan_id)
        ON DELETE CASCADE
);
GO

CREATE TABLE kyc_record
(
    kyc_id INT PRIMARY KEY IDENTITY,

    customer_id INT NOT NULL,

    document_type VARCHAR(50),

    document_number VARCHAR(100),

    issue_country VARCHAR(50),

    verification_status VARCHAR(20)
        CHECK(verification_status IN ('pending','verified','rejected')),

    verified_at DATETIME2,

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);
GO


CREATE TABLE audit_log
(
    log_id BIGINT PRIMARY KEY IDENTITY,

    entity_name VARCHAR(50),

    entity_id INT,

    action_type VARCHAR(20),

    performed_by INT,

    performed_at DATETIME2 DEFAULT SYSDATETIME(),

    details VARCHAR(1000)
);
GO

CREATE TABLE notification
(
    notification_id BIGINT PRIMARY KEY IDENTITY,

    customer_id INT NOT NULL,

    title VARCHAR(100),

    content VARCHAR(1000),

    notification_type VARCHAR(30),

    status VARCHAR(20) DEFAULT 'unread',

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(customer_id)
        REFERENCES customer(customer_id)
        ON DELETE CASCADE
);
GO

CREATE TABLE fraud_alert
(
    alert_id BIGINT PRIMARY KEY IDENTITY,

    transaction_id BIGINT,

    risk_score INT,

    status VARCHAR(20) DEFAULT 'open'
        CHECK(status IN ('open','investigating','closed')),

    created_at DATETIME2 DEFAULT SYSDATETIME(),

    FOREIGN KEY(transaction_id)
        REFERENCES transactions(transaction_id)
);
GO

CREATE TABLE financial_event
(
    event_id BIGINT PRIMARY KEY IDENTITY,

    event_type VARCHAR(30)
        CHECK(event_type IN
        (
            'transaction_created',
            'transaction_posted',
            'transaction_reversed',
            'fee_applied',
            'interest_accrued'
        )),

    entity_type VARCHAR(30),

    entity_id BIGINT,

    payload NVARCHAR(MAX),

    created_at DATETIME2 DEFAULT SYSDATETIME()
);
GO

CREATE TABLE account_balance_cache
(
    account_id INT PRIMARY KEY,

    available_balance DECIMAL(18,2),

    ledger_balance DECIMAL(18,2),

    updated_at DATETIME2
);
GO

CREATE TABLE merchant
(
    merchant_id INT PRIMARY KEY IDENTITY,

    merchant_name VARCHAR(100),

    merchant_category_code VARCHAR(10),

    city VARCHAR(50),

    country VARCHAR(50),

    registered_at DATETIME2
);
GO



/* =========================================================
   INDEXES
========================================================= */

CREATE INDEX IX_account_customer
ON account(customer_id);
GO

CREATE INDEX IX_transactions_source
ON transactions(source_account_id);
GO

CREATE INDEX IX_transactions_target
ON transactions(target_account_id);
GO

CREATE INDEX IX_card_account
ON card(account_id);
GO

CREATE INDEX IX_staff_branch
ON staff(branch_id);
GO
