USE BankSystemV1;
GO

/* =========================================================
   1. CURRENCY
========================================================= */
INSERT INTO currency.currency (currency_code, currency_name, currency_symbol, is_foreign)
VALUES 
('USD', 'US Dollar', '$', 1),
('EUR', 'Euro', '€', 1),
('IRR', 'Iranian Rial', '﷼', 0),
('GBP', 'British Pound', '£', 1),
('JPY', 'Japanese Yen', '¥', 1);
GO

/* =========================================================
   2. CUSTOMER & INDIVIDUAL/ORGANIZATION
========================================================= */
-- Create 5 Customers (We will make 3 Individuals and 2 Organizations)
INSERT INTO customer.customer (customer_type, phone, email, password_hash, status)
VALUES 
('individual', '09120000001', 'a1@test.com', 0x111, 'active'),
('individual', '09120000002', 'a2@test.com', 0x222, 'active'),
('individual', '09120000003', 'a3@test.com', 0x333, 'active'),
('organization', '02100000001', 'org1@test.com', 0x444, 'active'),
('organization', '02100000002', 'org2@test.com', 0x555, 'active');

-- Add 3 Individuals
INSERT INTO customer.individual_customer (customer_id, first_name, last_name, birth_date, ssn, occupation, address)
VALUES 
(1, 'John', 'Doe', '1990-05-15', 0xAA01, 'Engineer', 'St A'),
(2, 'Jane', 'Smith', '1985-08-20', 0xAA02, 'Doctor', 'St B'),
(3, 'Robert', 'Brown', '1992-12-10', 0xAA03, 'Artist', 'St C');

-- Add 2 Organizations
INSERT INTO customer.organization_customer (customer_id, organization_name, registration_number, founded_date, industry, headquarters_address, contact_person_id)
VALUES 
(4, 'TechCorp', 0xBB01, '2000-01-01', 'IT', 'Park Ave', 1),
(5, 'BuildInc', 0xBB02, '1995-03-12', 'Construction', 'Main St', 2);
GO

/* =========================================================
   3. BRANCH
========================================================= */
INSERT INTO branch.branch (branch_code, branch_name, city, address, establish_date, status)
VALUES 
('BR01', 'Central', 'Tehran', 'Ferdowsi', '2010-01-01', 'active'),
('BR02', 'North', 'Tehran', 'Vanak', '2012-05-10', 'active'),
('BR03', 'South', 'Tehran', 'Rey', '2015-08-20', 'active'),
('BR04', 'West', 'Tehran', 'Azadi', '2018-02-15', 'active'),
('BR05', 'East', 'Tehran', 'Tehranpars', '2020-11-30', 'active');
GO

/* =========================================================
   4. STAFF
========================================================= */
INSERT INTO staff.staff (first_name, last_name, ssn, email, phone, password_hash, role, branch_id, status)
VALUES 
('Ali', 'M', 0xCC01, 'm1@bank.com', '9111', 0x01, 'manager', 1, 'active'),
('Sara', 'T', 0xCC02, 'm2@bank.com', '9112', 0x02, 'teller', 1, 'active'),
('Reza', 'A', 0xCC03, 'm3@bank.com', '9113', 0x03, 'auditor', 2, 'active'),
('Mina', 'B', 0xCC04, 'm4@bank.com', '9114', 0x04, 'employee', 3, 'active'),
('Omid', 'C', 0xCC05, 'm5@bank.com', '9115', 0x05, 'employee', 4, 'active');
GO

/* =========================================================
   5. ACCOUNT & ACCOUNT_OWNER
========================================================= */
INSERT INTO account.account (account_number, currency_id, account_type, balance, account_status)
VALUES 
('1000000000000001', 3, 'saving', 5000.00, 'active'),
('1000000000000002', 3, 'current', 15000.00, 'active'),
('1000000000000003', 1, 'business', 250000.00, 'active'),
('1000000000000004', 3, 'investment', 10000.00, 'active'),
('1000000000000005', 3, 'saving', 2000.00, 'active');

INSERT INTO account.account_owner (account_id, customer_id, ownership_type, status)
VALUES 
(1, 1, 'primary', 'active'),
(2, 2, 'primary', 'active'),
(3, 4, 'primary', 'active'),
(4, 5, 'primary', 'active'),
(5, 3, 'primary', 'active');
GO

/* =========================================================
   6. DEVICE
========================================================= */
INSERT INTO device.device (device_type, customer_id, serial_number, device_identifier, status)
VALUES 
('MOBILE_APP', 1, 'MOB-001', 'ID-1', 'active'),
('MOBILE_APP', 2, 'MOB-002', 'ID-2', 'active'),
('WEB_BROWSER', 3, 'WEB-001', 'ID-3', 'active'),
('WEB_BROWSER', 4, 'WEB-002', 'ID-4', 'active'),
('POS', 5, 'POS-001', 'ID-5', 'active');
GO

/* =========================================================
   7. CARD
========================================================= */
-- NOTE: account_id must be unique for each card
INSERT INTO card.card (card_number, account_id, expire_date, cvv2, status)
VALUES 
('5022000000000001', 1, '2028-01-01', 0x111, 'active'),
('5022000000000002', 2, '2029-01-01', 0x222, 'active'),
('5022000000000003', 3, '2030-01-01', 0x333, 'active'),
('5022000000000004', 4, '2027-05-01', 0x444, 'active'),
('5022000000000005', 5, '2028-12-01', 0x555, 'active');
GO

/* =========================================================
   8. ATM & ATM_CASH
========================================================= */
INSERT INTO atm.atm (branch_id, city, address, status)
VALUES 
(1, 'Tehran', 'Ferdowsi Sq', 'active'),
(1, 'Tehran', 'Ferdowsi St', 'active'),
(2, 'Tehran', 'Vanak Sq', 'active'),
(3, 'Tehran', 'Rey St', 'active'),
(4, 'Tehran', 'Azadi St', 'active');

INSERT INTO atm.atm_cash (atm_id, currency_id, amount)
VALUES 
(1, 3, 5000000.00),
(2, 3, 2000000.00),
(3, 3, 1000000.00),
(4, 3, 4000000.00),
(5, 3, 3000000.00);
GO

/* =========================================================
   9. TRANSACTIONS
========================================================= */
-- Note: Check constraints require target_account_id for transfer/bill_payment
-- and NO target for withdraw/purchase
INSERT INTO trx.transactions (reference_code, source_account_id, target_account_id, source_device_id, transaction_type, amount, transaction_status)
VALUES 
('REF001', 1, 2, 1, 'transfer', 100.00, 'successful'),
('REF002', 1, NULL, 1, 'withdraw', 50.00, 'successful'),
('REF003', NULL, 3, NULL, 'deposit', 5000.00, 'successful'),
('REF004', 3, NULL, 5, 'purchase', 200.00, 'successful'),
('REF005', 2, 1, 2, 'bill_payment', 30.00, 'successful');
GO

/* =========================================================
   10. CHEQUE
========================================================= */
INSERT INTO cheque.checkbook (account_id, branch_id, number_of_checks, status)
VALUES 
(1, 1, 25, 'active'),
(2, 1, 25, 'active'),
(3, 1, 50, 'active'),
(4, 2, 25, 'active'),
(5, 3, 25, 'active');

INSERT INTO cheque.check_paper (check_number, checkbook_id, receiver_account_id, amount, expire_date, status)
VALUES 
('CHQ001', 1, 2, 1000.00, '2026-12-30', 'issued'),
('CHQ002', 1, 2, 2000.00, '2026-12-30', 'issued'),
('CHQ003', 2, 1, 500.00, '2026-12-30', 'issued'),
('CHQ004', 3, 4, 10000.00, '2026-12-30', 'issued'),
('CHQ005', 4, 5, 100.00, '2026-12-30', 'issued');
GO

/* =========================================================
   11. LOAN
========================================================= */
INSERT INTO loan.loan (account_id, guarantor_customer_id, amount, interest_rate, loan_term_months, repayment_status)
VALUES 
(1, 2, 10000.00, 10.00, 12, 'active'),
(2, 1, 20000.00, 12.00, 24, 'active'),
(3, 5, 100000.00, 5.00, 36, 'active'),
(4, 1, 5000.00, 15.00, 6, 'active'),
(5, 2, 8000.00, 11.00, 18, 'active');
GO

/* =========================================================
   12. MESSAGE
========================================================= */
INSERT INTO message.message (customer_id, subject, body, message_status)
VALUES 
(1, 'Hello', 'Welcome to our bank.', 'unread'),
(2, 'Notice', 'Your account is active.', 'read'),
(3, 'Alert', 'New login detected.', 'unread'),
(4, 'Update', 'Interest rates changed.', 'unread'),
(5, 'Support', 'Request received.', 'read');
GO
