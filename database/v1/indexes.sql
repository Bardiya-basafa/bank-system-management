USE BankSystemV1;
GO

-- customer.customer
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_customer_status' AND object_id = OBJECT_ID('customer.customer'))
    CREATE INDEX IX_customer_status ON customer.customer(status);
GO

-- customer.individual_customer
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_individual_customer_ssn' AND object_id = OBJECT_ID('customer.individual_customer'))
    CREATE INDEX IX_individual_customer_ssn ON customer.individual_customer(ssn);
GO

-- customer.organization_customer
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_organization_customer_contact_person' AND object_id = OBJECT_ID('customer.organization_customer'))
    CREATE INDEX IX_organization_customer_contact_person ON customer.organization_customer(contact_person_id);
GO

-- staff.staff
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_staff_branch' AND object_id = OBJECT_ID('staff.staff'))
    CREATE INDEX IX_staff_branch ON staff.staff(branch_id);
GO

-- account.account
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_account_currency' AND object_id = OBJECT_ID('account.account'))
    CREATE INDEX IX_account_currency ON account.account(currency_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_account_status' AND object_id = OBJECT_ID('account.account'))
    CREATE INDEX IX_account_status ON account.account(account_status);
GO

-- account.account_owner
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_account_owner_customer' AND object_id = OBJECT_ID('account.account_owner'))
    CREATE INDEX IX_account_owner_customer ON account.account_owner(customer_id);
GO

-- card.card
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_card_account' AND object_id = OBJECT_ID('card.card'))
    CREATE INDEX IX_card_account ON card.card(account_id);
GO

-- atm.atm
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_atm_branch' AND object_id = OBJECT_ID('atm.atm'))
    CREATE INDEX IX_atm_branch ON atm.atm(branch_id);
GO

-- atm.atm_cash
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_atm_cash_currency' AND object_id = OBJECT_ID('atm.atm_cash'))
    CREATE INDEX IX_atm_cash_currency ON atm.atm_cash(currency_id);
GO

-- device.pos
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_pos_branch' AND object_id = OBJECT_ID('device.pos'))
    CREATE INDEX IX_pos_branch ON device.pos(branch_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_pos_customer' AND object_id = OBJECT_ID('device.pos'))
    CREATE INDEX IX_pos_customer ON device.pos(customer_id);
GO

-- device.registered_device
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_registered_device_customer' AND object_id = OBJECT_ID('device.registered_device'))
    CREATE INDEX IX_registered_device_customer ON device.registered_device(customer_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_registered_device_device' AND object_id = OBJECT_ID('device.registered_device'))
    CREATE INDEX IX_registered_device_device ON device.registered_device(device_id);
GO

-- trx.transactions
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_transactions_source' AND object_id = OBJECT_ID('trx.transactions'))
    CREATE INDEX IX_transactions_source ON trx.transactions(source_account_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_transactions_target' AND object_id = OBJECT_ID('trx.transactions'))
    CREATE INDEX IX_transactions_target ON trx.transactions(target_account_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_transactions_device' AND object_id = OBJECT_ID('trx.transactions'))
    CREATE INDEX IX_transactions_device ON trx.transactions(device_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_transactions_status' AND object_id = OBJECT_ID('trx.transactions'))
    CREATE INDEX IX_transactions_status ON trx.transactions(transaction_status);
GO

-- cheque.checkbook
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_checkbook_account' AND object_id = OBJECT_ID('cheque.checkbook'))
    CREATE INDEX IX_checkbook_account ON cheque.checkbook(account_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_checkbook_branch' AND object_id = OBJECT_ID('cheque.checkbook'))
    CREATE INDEX IX_checkbook_branch ON cheque.checkbook(branch_id);
GO

-- cheque.check_paper
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_check_paper_checkbook' AND object_id = OBJECT_ID('cheque.check_paper'))
    CREATE INDEX IX_check_paper_checkbook ON cheque.check_paper(checkbook_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_check_paper_drawer_account' AND object_id = OBJECT_ID('cheque.check_paper'))
    CREATE INDEX IX_check_paper_drawer_account ON cheque.check_paper(drawer_account_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_check_paper_payer_account' AND object_id = OBJECT_ID('cheque.check_paper'))
    CREATE INDEX IX_check_paper_payer_account ON cheque.check_paper(payer_account_id);
GO

-- loan.loan
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_loan_account' AND object_id = OBJECT_ID('loan.loan'))
    CREATE INDEX IX_loan_account ON loan.loan(account_id);
GO

IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_loan_guarantor_customer' AND object_id = OBJECT_ID('loan.loan'))
    CREATE INDEX IX_loan_guarantor_customer ON loan.loan(guarantor_customer_id);
GO

-- loan.facility
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_facility_account' AND object_id = OBJECT_ID('loan.facility'))
    CREATE INDEX IX_facility_account ON loan.facility(account_id);
GO

-- message.message
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_message_customer' AND object_id = OBJECT_ID('message.message'))
    CREATE INDEX IX_message_customer ON message.message(customer_id);
GO

-- payment.online_payment
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_online_payment_customer' AND object_id = OBJECT_ID('payment.online_payment'))
    CREATE INDEX IX_online_payment_customer ON payment.online_payment(customer_id);
GO

-- ledger.ledger_account
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name = 'IX_ledger_parent' AND object_id = OBJECT_ID('ledger.ledger_account'))
    CREATE INDEX IX_ledger_parent ON ledger.ledger_account(parent_ledger_account_id);
GO