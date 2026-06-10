-- =========================================================
-- SEED DATA FOR BankSystemV1 (CORRECTED)
-- =========================================================
USE BankSystemV1;
GO

-- =========================================================
-- CURRENCY (8 rows)
-- =========================================================
INSERT INTO currency.currency (currency_code, currency_name, currency_symbol, is_foreign) VALUES
('IRR', 'Iranian Rial', '﷼', 0),
('USD', 'US Dollar', '$', 1),
('EUR', 'Euro', '€', 1),
('GBP', 'British Pound', '£', 1),
('AED', 'UAE Dirham', 'د.إ', 1),
('TRY', 'Turkish Lira', '₺', 1),
('CNY', 'Chinese Yuan', '¥', 1),
('RUB', 'Russian Ruble', '₽', 1);
GO

-- =========================================================
-- BRANCH (5 rows)
-- =========================================================
INSERT INTO branch.branch (branch_code, branch_name, city, address, establish_date, status) VALUES
('BR001', 'Tehran Central', 'Tehran', '123 Valiasr Ave', '2005-03-15', 'active'),
('BR002', 'Tehran North', 'Tehran', '456 Shahid Beheshti St', '2010-06-20', 'active'),
('BR003', 'Isfahan Main', 'Isfahan', '789 Chahar Bagh Blvd', '2008-11-01', 'active'),
('BR004', 'Shiraz Branch', 'Shiraz', '321 Zand St', '2012-04-10', 'active'),
('BR005', 'Mashhad Central', 'Mashhad', '654 Imam Reza St', '2007-09-25', 'renovating');
GO

-- =========================================================
-- STAFF (7 rows)
-- =========================================================
INSERT INTO staff.staff (first_name, last_name, ssn, email, phone, password_hash, role, address, hire_date, branch_id, status) VALUES
('Ali', 'Mohammadi', HASHBYTES('SHA2_256', '0012345678'), 'ali.m@bank.com', '+989121234567', HASHBYTES('SHA2_256', 'p1'), 'manager', 'Tehran, Zafar St', '2010-03-15', 1, 'active'),
('Sara', 'Ahmadi', HASHBYTES('SHA2_256', '0023456789'), 'sara.a@bank.com', '+989122345678', HASHBYTES('SHA2_256', 'p2'), 'employee', 'Tehran, Kaveh Blvd', '2015-06-01', 1, 'active'),
('Reza', 'Hosseini', HASHBYTES('SHA2_256', '0034567890'), 'reza.h@bank.com', '+989133456789', HASHBYTES('SHA2_256', 'p3'), 'teller', 'Tehran, Mirdamad Ave', '2018-01-10', 2, 'active'),
('Maryam', 'Rezaei', HASHBYTES('SHA2_256', '0045678901'), 'maryam.r@bank.com', '+989144567890', HASHBYTES('SHA2_256', 'p4'), 'manager', 'Isfahan, Si-o-se-pol', '2012-04-20', 3, 'active'),
('Amir', 'Jafari', HASHBYTES('SHA2_256', '0056789012'), 'amir.j@bank.com', '+989155678901', HASHBYTES('SHA2_256', 'p5'), 'admin', 'Tehran, Sattar Khan St', '2014-11-01', NULL, 'active'),
('Neda', 'Shahbazi', HASHBYTES('SHA2_256', '0067890123'), 'neda.s@bank.com', '+989166789012', HASHBYTES('SHA2_256', 'p6'), 'auditor', 'Tehran, Shariati Ave', '2011-07-15', NULL, 'active'),
('Leila', 'Taghavi', HASHBYTES('SHA2_256', '0078901234'), 'leila.t@bank.com', '+989177890123', HASHBYTES('SHA2_256', 'p7'), 'employee', 'Karaj, Azadi St', '2020-06-15', 4, 'on_leave');
GO

-- =========================================================
-- CUSTOMERS (10 rows: 7 individual + 3 organization)
-- =========================================================
INSERT INTO customer.customer (customer_type, phone, email, password_hash, status, created_at) VALUES
('individual', '+989111111111', 'mohsen.k@email.com', HASHBYTES('SHA2_256', 'c1'), 'active', '2019-01-15'),
('individual', '+989122222222', 'fatemeh.m@email.com', HASHBYTES('SHA2_256', 'c2'), 'active', '2019-03-20'),
('individual', '+989133333333', 'hamid.s@email.com', HASHBYTES('SHA2_256', 'c3'), 'active', '2020-06-10'),
('individual', '+989144444444', 'nastaran.g@email.com', HASHBYTES('SHA2_256', 'c4'), 'active', '2018-11-05'),
('individual', '+989155555555', 'behnam.y@email.com', HASHBYTES('SHA2_256', 'c5'), 'suspended', '2017-08-25'),
('individual', '+989166666666', 'shirin.a@email.com', HASHBYTES('SHA2_256', 'c6'), 'active', '2021-02-14'),
('individual', '+989177777777', 'kambiz.n@email.com', HASHBYTES('SHA2_256', 'c7'), 'active', '2020-07-01'),
('organization', '+982112345678', 'info@parstech.com', HASHBYTES('SHA2_256', 'o1'), 'active', '2015-04-10'),
('organization', '+982187654321', 'contact@novinco.ir', HASHBYTES('SHA2_256', 'o2'), 'active', '2016-09-15'),
('organization', '+982133344455', 'admin@sadrabn.com', HASHBYTES('SHA2_256', 'o3'), 'active', '2018-03-25');
GO

INSERT INTO customer.individual_customer (customer_id, first_name, last_name, birth_date, ssn, occupation, address) VALUES
(1, 'Mohsen', 'Kazemi', '1985-05-12', HASHBYTES('SHA2_256', 'SSN001'), 'Engineer', 'Tehran, Shariati St'),
(2, 'Fatemeh', 'Moradi', '1990-09-23', HASHBYTES('SHA2_256', 'SSN002'), 'Teacher', 'Tehran, Vanak Sq'),
(3, 'Hamid', 'Salehi', '1982-03-17', HASHBYTES('SHA2_256', 'SSN003'), 'Doctor', 'Isfahan, Chahar Bagh'),
(4, 'Nastaran', 'Ghasemi', '1992-11-08', HASHBYTES('SHA2_256', 'SSN004'), 'Lawyer', 'Shiraz, Zand Blvd'),
(5, 'Behnam', 'Yousefi', '1978-07-30', HASHBYTES('SHA2_256', 'SSN005'), 'Businessman', 'Tehran, Sadeghieh'),
(6, 'Shirin', 'Akbari', '1995-01-15', HASHBYTES('SHA2_256', 'SSN006'), 'Designer', 'Tehran, Elahieh'),
(7, 'Kambiz', 'Nouri', '1988-06-21', HASHBYTES('SHA2_256', 'SSN007'), 'Accountant', 'Mashhad, Ferdowsi');
GO

INSERT INTO customer.organization_customer (customer_id, organization_name, registration_number, founded_date, industry, headquarters_address, contact_person_id, ceo_ssn) VALUES
(8, 'Pars Tech Solutions', HASHBYTES('SHA2_256', 'REG001'), '2015-04-10', 'Technology', 'Tehran, IT Park, Pardis', 1, HASHBYTES('SHA2_256', 'CEO001')),
(9, 'Novin Commercial Co.', HASHBYTES('SHA2_256', 'REG002'), '2016-09-15', 'Trading', 'Tehran, Business Tower', 3, HASHBYTES('SHA2_256', 'CEO002')),
(10, 'Sadra Building Co.', HASHBYTES('SHA2_256', 'REG003'), '2018-03-25', 'Construction', 'Karaj, Industrial Zone', 6, HASHBYTES('SHA2_256', 'CEO003'));
GO

-- =========================================================
-- ACCOUNTS (10 rows)
-- =========================================================
INSERT INTO account.account (account_number, currency_id, account_type, balance, account_status, created_at) VALUES
('6037011234567801', 1, 'saving', 1500000000, 'active', '2019-01-20'),
('6037011234567802', 1, 'current', 500000000, 'active', '2019-03-25'),
('6037011234567803', 1, 'saving', 750000000, 'active', '2020-06-15'),
('6037011234567804', 2, 'saving', 25000, 'active', '2018-11-10'),
('6037011234567805', 1, 'business', 5000000000, 'active', '2017-09-01'),
('6037011234567806', 1, 'business', 8000000000, 'active', '2015-04-15'),
('6037011234567807', 1, 'business', 3500000000, 'active', '2016-09-20'),
('6037011234567808', 3, 'saving', 50000, 'active', '2021-02-20'),
('6037011234567809', 1, 'loan_facility', 0, 'active', '2020-07-05'),
('6037011234567810', 1, 'investment', 2000000000, 'active', '2016-05-20');
GO

-- =========================================================
-- ACCOUNT OWNERS (12 rows)
-- =========================================================
INSERT INTO account.account_owner (account_id, customer_id, ownership_type, assigned_at, status) VALUES
(1, 1, 'primary', '2019-01-20', 'active'),
(2, 2, 'primary', '2019-03-25', 'active'),
(3, 3, 'primary', '2020-06-15', 'active'),
(4, 4, 'primary', '2018-11-10', 'active'),
(5, 5, 'primary', '2017-09-01', 'active'),
(5, 1, 'authorized_signer', '2017-09-15', 'active'),
(6, 8, 'primary', '2015-04-15', 'active'),
(7, 9, 'primary', '2016-09-20', 'active'),
(8, 6, 'primary', '2021-02-20', 'active'),
(9, 7, 'primary', '2020-07-05', 'active'),
(10, 4, 'primary', '2016-05-20', 'active'),
(10, 2, 'beneficiary', '2016-05-20', 'active');
GO

-- =========================================================
-- DEVICES (8 rows)
-- =========================================================
INSERT INTO device.device (device_type, customer_id, serial_number, device_identifier, registered_at, last_seen_at, status) VALUES
('MOBILE_APP', 1, NULL, 'MOB-001', '2019-01-20', '2026-06-10', 'active'),
('WEB_BROWSER', 1, NULL, 'WEB-001', '2019-01-20', '2026-06-09', 'active'),
('MOBILE_APP', 2, NULL, 'MOB-002', '2019-03-25', '2026-06-10', 'active'),
('POS', NULL, 'POS-001', 'POS-T1', '2020-01-15', '2026-06-10', 'active');
GO

-- =========================================================
-- CARDS (6 rows - all expire_dates > GETDATE() -> using 2028+)
-- =========================================================
INSERT INTO card.card (card_number, account_id, expire_date, cvv2, status, issued_at) VALUES
('6037011234567891', 1, '2028-06-30', HASHBYTES('SHA2_256', '123'), 'active', '2019-01-25'),
('6037011234567892', 2, '2028-08-31', HASHBYTES('SHA2_256', '456'), 'active', '2019-03-30'),
('6037011234567893', 3, '2029-01-31', HASHBYTES('SHA2_256', '789'), 'active', '2020-06-20'),
('6037011234567894', 8, '2028-12-31', HASHBYTES('SHA2_256', '234'), 'active', '2021-02-25'),
('6037011234567895', 5, '2028-09-30', HASHBYTES('SHA2_256', '567'), 'active', '2017-09-05'),
('6037011234567896', 10, '2028-06-30', HASHBYTES('SHA2_256', '890'), 'active', '2019-07-30');
GO

-- =========================================================
-- ATM (3 rows)
-- =========================================================
INSERT INTO atm.atm (branch_id, city, address, status, establish_date) VALUES
(1, 'Tehran', 'Valiasr Ave - Mellat Park', 'active', '2018-06-01'),
(3, 'Isfahan', 'Chahar Bagh Blvd - Bank', 'active', '2019-01-10'),
(2, 'Tehran', 'Shahid Beheshti - Commercial', 'maintenance', '2019-01-10');
GO

INSERT INTO atm.atm_cash (atm_id, currency_id, amount) VALUES
(1, 1, 5000000000),
(1, 2, 100000),
(2, 1, 4000000000),
(2, 3, 50000),
(3, 1, 1000000000);
GO

-- =========================================================
-- TRANSACTIONS (10 rows - all constraint-compliant)
-- =========================================================
INSERT INTO trx.transactions (reference_code, source_account_id, target_account_id, source_device_id, transaction_type, amount, transaction_status, description, issued_at, completed_at) VALUES
('TXN-001', 1, 3, NULL, 'transfer', 50000000, 'successful', 'Transfer to Hamid', '2026-06-10 09:00', '2026-06-10 09:00'),
('TXN-002', 2, NULL, 6, 'withdraw', 20000000, 'successful', 'ATM Withdrawal', '2026-06-10 09:15', '2026-06-10 09:15'),
('TXN-003', NULL, 5, NULL, 'deposit', 100000000, 'successful', 'Cash deposit at branch', '2026-06-10 09:30', '2026-06-10 09:30'),
('TXN-004', 5, NULL, 4, 'purchase', 35000000, 'successful', 'POS Purchase - Store', '2026-06-10 10:00', '2026-06-10 10:00'),
('TXN-005', 1, 6, NULL, 'bill_payment', 15000000, 'successful', 'Electricity Bill', '2026-06-10 10:15', '2026-06-10 10:15'),
('TXN-006', 3, 1, NULL, 'transfer', 30000000, 'successful', 'Return borrowed money', '2026-06-09 14:00', '2026-06-09 14:00'),
('TXN-007', 6, 7, NULL, 'transfer', 200000000, 'successful', 'Contract payment', '2026-06-09 11:00', '2026-06-09 11:00'),
('TXN-008', 10, NULL, 1, 'withdraw', 100000000, 'successful', 'Mobile app withdrawal', '2026-06-09 16:30', '2026-06-09 16:30'),
('TXN-009', NULL, 9, NULL, 'deposit', 500000000, 'successful', 'Loan disbursement', '2026-06-09 09:00', '2026-06-09 09:00'),
('TXN-010', 7, 6, NULL, 'transfer', 150000000, 'pending', 'Pending bulk transfer', '2026-06-08 10:00', NULL);
GO

-- =========================================================
-- CHECKBOOKS (5 rows)
-- =========================================================
INSERT INTO cheque.checkbook (account_id, branch_id, issue_date, number_of_checks, status) VALUES
(2, 1, '2025-01-15', 50, 'active'),
(5, 2, '2025-03-20', 100, 'active'),
(6, 1, '2025-06-10', 50, 'active'),
(7, 3, '2025-09-01', 25, 'issued'),
(3, 1, '2025-12-01', 30, 'active');
GO

-- =========================================================
-- CHECKS (7 rows)
-- =========================================================
INSERT INTO cheque.check_paper (check_number, checkbook_id, receiver_account_id, amount, issued_at, expire_date, cleared_date, status) VALUES
('CHK-001-01', 1, 5, 75000000, '2026-05-15', '2026-08-15', '2026-05-20', 'cashed'),
('CHK-001-02', 1, 3, 120000000, '2026-06-01', '2026-09-01', NULL, 'issued'),
('CHK-002-01', 2, 6, 450000000, '2026-05-10', '2026-08-10', '2026-05-15', 'cashed'),
('CHK-002-02', 2, 1, 50000000, '2026-06-05', '2026-09-05', NULL, 'issued'),
('CHK-003-01', 3, 7, 300000000, '2026-04-01', '2026-07-01', NULL, 'bounced'),
('CHK-003-02', 3, 4, 150000000, '2026-06-10', '2026-09-10', NULL, 'issued'),
('CHK-004-01', 4, 3, 220000000, '2026-03-15', '2026-06-15', '2026-03-25', 'cashed');
GO

-- =========================================================
-- LOANS (5 rows)
-- =========================================================
INSERT INTO loan.loan (account_id, guarantor_customer_id, amount, interest_rate, loan_term_months, repayment_status, issue_date) VALUES
(9, 2, 500000000, 18.00, 24, 'active', '2020-07-05'),
(9, 1, 750000000, 15.00, 36, 'active', '2021-03-15'),
(9, 3, 300000000, 12.00, 12, 'completed', '2019-01-10'),
(5, 4, 1000000000, 20.00, 48, 'active', '2022-01-20'),
(10, 6, 1500000000, 16.50, 60, 'active', '2023-06-01');
GO

-- =========================================================
-- MESSAGES (8 rows)
-- =========================================================
INSERT INTO message.message (customer_id, subject, body, message_status, created_at, read_at) VALUES
(1, 'Welcome', 'Welcome to BankSystemV1.', 'read', '2019-01-20', '2019-01-21'),
(1, 'Transaction Alert', 'Transfer of 50M sent to acct ending 7803.', 'unread', '2026-06-10', NULL),
(2, 'Rate Update', 'Savings rates updated to 15%.', 'read', '2026-06-01', '2026-06-02'),
(3, 'Card Expiry', 'Card ending 7893 expires 2029-01-31.', 'unread', '2026-06-05', NULL),
(5, 'Account Suspended', 'Account suspended due to suspicious activity.', 'read', '2026-05-15', '2026-05-16'),
(8, 'Statement Ready', 'Monthly statement is ready for download.', 'unread', '2026-06-01', NULL),
(7, 'Loan Approved', 'Your loan of 500M has been approved.', 'read', '2020-07-06', '2020-07-07'),
(4, 'Welcome', 'Welcome to BankSystemV1.', 'archived', '2018-11-06', '2018-11-07');
GO

-- =========================================================
-- ACCOUNT BALANCE HISTORY (7 rows)
-- =========================================================
INSERT INTO ledger.account_balance_history (account_id, old_balance, new_balance, changed_at, changed_by_transaction_id, changed_by_user_id) VALUES
(1, 1550000000, 1500000000, '2026-06-10 09:00', 1, NULL),
(2, 520000000, 500000000, '2026-06-10 09:15', 2, NULL),
(5, 4900000000, 5000000000, '2026-06-10 09:30', 3, NULL),
(5, 5000000000, 4965000000, '2026-06-10 10:00', 4, NULL),
(1, 1500000000, 1485000000, '2026-06-10 10:15', 5, NULL),
(3, 780000000, 750000000, '2026-06-09 14:00', 6, NULL),
(1, 1485000000, 1515000000, '2026-06-09 14:00', 6, NULL);
GO

-- =========================================================
-- TRANSACTION STATUS HISTORY (5 rows)
-- =========================================================
INSERT INTO ledger.transaction_status_history (transaction_id, old_status, new_status, changed_at, changed_by_user_id, note) VALUES
(10, 'pending', 'pending', '2026-06-08 10:01', NULL, 'Awaiting manager approval'),
(10, 'pending', 'pending', '2026-06-08 12:00', 1, 'Under review by Ali Mohammadi'),
(6, 'pending', 'successful', '2026-06-09 14:00', NULL, 'Auto-completed by system'),
(9, 'pending', 'successful', '2026-06-09 09:00', NULL, 'Auto-completed by system'),
(7, 'pending', 'successful', '2026-06-09 11:00', NULL, 'Auto-completed by system');
GO

PRINT 'Seed data inserted successfully!';
GO
