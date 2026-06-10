USE BankSystemV1;
GO

/* =========================================================
   CUSTOMER DATA
========================================================= */
-- Base customers
INSERT INTO customer.customer
    (customer_type, phone, email, password_hash, status)
VALUES
    ('individual', '+1-555-0101', 'john.smith@email.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('individual', '+1-555-0102', 'emma.johnson@email.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('individual', '+1-555-0103', 'michael.brown@email.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('individual', '+1-555-0104', 'sarah.davis@email.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('individual', '+1-555-0105', 'james.wilson@email.com', HASHBYTES('SHA2_256', 'pass123'), 'dormant'),
    ('organization', '+1-555-0201', 'info@techcorp.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('organization', '+1-555-0202', 'contact@greenfarm.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('organization', '+1-555-0203', 'admin@cityhotel.com', HASHBYTES('SHA2_256', 'pass123'), 'active'),
    ('individual', '+1-555-0106', 'lisa.anderson@email.com', HASHBYTES('SHA2_256', 'pass123'), 'suspended'),
    ('individual', '+1-555-0107', 'robert.taylor@email.com', HASHBYTES('SHA2_256', 'pass123'), 'active');

-- Individual customers
INSERT INTO customer.individual_customer
    (customer_id, first_name, last_name, birth_date, ssn, occupation, address)
VALUES
    (1, 'John', 'Smith', '1985-03-15', HASHBYTES('SHA2_256', '123-45-6789'), 'Software Engineer', '123 Main St, Boston, MA 02101'),
    (2, 'Emma', 'Johnson', '1990-07-22', HASHBYTES('SHA2_256', '234-56-7890'), 'Teacher', '456 Oak Ave, Chicago, IL 60601'),
    (3, 'Michael', 'Brown', '1978-11-08', HASHBYTES('SHA2_256', '345-67-8901'), 'Doctor', '789 Pine Rd, Houston, TX 77001'),
    (4, 'Sarah', 'Davis', '1992-01-30', HASHBYTES('SHA2_256', '456-78-9012'), 'Accountant', '321 Elm St, Phoenix, AZ 85001'),
    (5, 'James', 'Wilson', '1988-09-14', HASHBYTES('SHA2_256', '567-89-0123'), 'Architect', '654 Maple Dr, Denver, CO 80201'),
    (9, 'Lisa', 'Anderson', '1995-04-18', HASHBYTES('SHA2_256', '678-90-1234'), 'Marketing Manager', '987 Cedar Ln, Seattle, WA 98101'),
    (10, 'Robert', 'Taylor', '1983-12-05', HASHBYTES('SHA2_256', '789-01-2345'), 'Lawyer', '147 Birch Ct, Miami, FL 33101');

-- Organization customers
INSERT INTO customer.organization_customer
    (customer_id, organization_name, registration_number, founded_date, industry, headquarters_address)
VALUES
    (6, 'TechCorp Inc.', HASHBYTES('SHA2_256', 'REG-2020-001'), '2015-06-01', 'Technology', '100 Innovation Way, San Francisco, CA 94105'),
    (7, 'Green Farm Organics', HASHBYTES('SHA2_256', 'REG-2018-045'), '2018-03-15', 'Agriculture', '200 Rural Route, Portland, OR 97201'),
    (8, 'City Hotel Group', HASHBYTES('SHA2_256', 'REG-2010-089'), '2010-01-20', 'Hospitality', '500 Downtown Ave, New York, NY 10001');

/* =========================================================
   BRANCH DATA
========================================================= */
INSERT INTO branch.branch
    (branch_code, branch_name, city, address, establish_date, status)
VALUES
    ('BR001', 'Downtown Main Branch', 'New York', '1 Wall Street, NY 10005', '2000-01-15', 'active'),
    ('BR002', 'Silicon Valley Branch', 'San Francisco', '200 Market St, CA 94105', '2005-06-01', 'active'),
    ('BR003', 'Chicago Central', 'Chicago', '400 Michigan Ave, IL 60611', '2008-03-20', 'active'),
    ('BR004', 'Houston Energy Branch', 'Houston', '800 Texas Ave, TX 77002', '2010-09-10', 'active'),
    ('BR005', 'Miami Beach Branch', 'Miami', '100 Ocean Dr, FL 33139', '2012-11-01', 'renovating'),
    ('BR006', 'Seattle Tech Branch', 'Seattle', '300 Pike St, WA 98101', '2015-04-15', 'active'),
    ('BR007', 'Boston Historic Branch', 'Boston', '50 State St, MA 02109', '1998-07-01', 'active'),
    ('BR008', 'Denver Mountain Branch', 'Denver', '1600 Broadway, CO 80202', '2018-01-20', 'active'),
    ('BR009', 'Phoenix Desert Branch', 'Phoenix', '1 Arizona Center, AZ 85004', '2016-08-05', 'active'),
    ('BR010', 'Portland Green Branch', 'Portland', '500 Pioneer Sq, OR 97204', '2019-03-12', 'closed');

/* =========================================================
   STAFF DATA
========================================================= */
INSERT INTO staff.staff
    (first_name, last_name, ssn, email, phone, password_hash, role, address, hire_date, branch_id, status)
VALUES
    ('William', 'Clark', HASHBYTES('SHA2_256', '890-12-3456'), 'william.clark@bank.com', '+1-555-3001', HASHBYTES('SHA2_256', 'staff123'), 'manager', '10 Bank St, NY 10005', '2010-01-10', 1, 'active'),
    ('Jennifer', 'Martinez', HASHBYTES('SHA2_256', '901-23-4567'), 'jennifer.martinez@bank.com', '+1-555-3002', HASHBYTES('SHA2_256', 'staff123'), 'teller', '20 Market St, SF 94105', '2015-06-15', 2, 'active'),
    ('David', 'Thompson', HASHBYTES('SHA2_256', '012-34-5678'), 'david.thompson@bank.com', '+1-555-3003', HASHBYTES('SHA2_256', 'staff123'), 'employee', '30 Michigan Ave, IL 60611', '2018-03-01', 3, 'active'),
    ('Patricia', 'Garcia', HASHBYTES('SHA2_256', '123-45-6780'), 'patricia.garcia@bank.com', '+1-555-3004', HASHBYTES('SHA2_256', 'staff123'), 'auditor', '40 Texas Ave, TX 77002', '2012-09-01', 4, 'active'),
    ('Christopher', 'Lee', HASHBYTES('SHA2_256', '234-56-7891'), 'christopher.lee@bank.com', '+1-555-3005', HASHBYTES('SHA2_256', 'staff123'), 'admin', '50 Ocean Dr, FL 33139', '2016-04-20', 5, 'on_leave'),
    ('Elizabeth', 'White', HASHBYTES('SHA2_256', '345-67-8902'), 'elizabeth.white@bank.com', '+1-555-3006', HASHBYTES('SHA2_256', 'staff123'), 'manager', '60 Pike St, WA 98101', '2014-07-10', 6, 'active'),
    ('Daniel', 'Harris', HASHBYTES('SHA2_256', '456-78-9013'), 'daniel.harris@bank.com', '+1-555-3007', HASHBYTES('SHA2_256', 'staff123'), 'teller', '70 State St, MA 02109', '2019-01-15', 7, 'active'),
    ('Michelle', 'Robinson', HASHBYTES('SHA2_256', '567-89-0124'), 'michelle.robinson@bank.com', '+1-555-3008', HASHBYTES('SHA2_256', 'staff123'), 'employee', '80 Broadway, CO 80202', '2017-05-20', 8, 'active'),
    ('Andrew', 'Walker', HASHBYTES('SHA2_256', '678-90-1235'), 'andrew.walker@bank.com', '+1-555-3009', HASHBYTES('SHA2_256', 'staff123'), 'manager', '90 Arizona Center, AZ 85004', '2013-11-01', 9, 'inactive'),
    ('Jessica', 'Hall', HASHBYTES('SHA2_256', '789-01-2346'), 'jessica.hall@bank.com', '+1-555-3010', HASHBYTES('SHA2_256', 'staff123'), 'employee', '100 Pioneer Sq, OR 97204', '2020-02-28', 10, 'active');

/* =========================================================
   CURRENCY DATA
========================================================= */
INSERT INTO currency.currency
    (currency_code, currency_name, currency_symbol, is_foreign)
VALUES
    ('USD', 'US Dollar', '$', 0),
    ('EUR', 'Euro', '€', 1),
    ('GBP', 'British Pound', '£', 1),
    ('JPY', 'Japanese Yen', '¥', 1),
    ('CAD', 'Canadian Dollar', 'C$', 1),
    ('AUD', 'Australian Dollar', 'A$', 1),
    ('CHF', 'Swiss Franc', 'Fr', 1),
    ('CNY', 'Chinese Yuan', '¥', 1),
    ('INR', 'Indian Rupee', '₹', 1),
    ('MXN', 'Mexican Peso', 'Mex$', 1);

/* =========================================================
   ACCOUNT DATA
========================================================= */
INSERT INTO account.account
    (account_number, currency_id, account_type, balance, account_status)
VALUES
    ('1000123456789001', 1, 'saving', 25000.00, 'active'),
    ('1000123456789002', 1, 'current', 150000.00, 'active'),
    ('1000123456789003', 2, 'saving', 50000.00, 'active'),
    ('1000123456789004', 1, 'business', 500000.00, 'active'),
    ('1000123456789005', 3, 'investment', 75000.00, 'active'),
    ('1000123456789006', 1, 'saving', 1000.00, 'dormant'),
    ('1000123456789007', 1, 'current', 250000.00, 'active'),
    ('1000123456789008', 4, 'saving', 1000000.00, 'blocked'),
    ('1000123456789009', 1, 'loan_facility', 0.00, 'active'),
    ('1000123456789010', 2, 'investment', 200000.00, 'active');

-- Account ownership
INSERT INTO account.account_owner
    (account_id, customer_id, ownership_type, status)
VALUES
    (1, 1, 'primary', 'active'),
    (2, 2, 'primary', 'active'),
    (3, 3, 'primary', 'active'),
    (4, 6, 'primary', 'active'),
    (4, 1, 'authorized_signer', 'active'),
    (5, 10, 'primary', 'active'),
    (6, 5, 'primary', 'active'),
    (7, 7, 'primary', 'active'),
    (8, 4, 'primary', 'active'),
    (9, 8, 'primary', 'active'),
    (10, 6, 'primary', 'active'),
    (2, 3, 'joint', 'active'),
    (5, 9, 'beneficiary', 'active');

/* =========================================================
   DEVICE DATA
========================================================= */
INSERT INTO device.device
    (device_type, serial_number, device_identifier, status)
VALUES
    ('ATM', 'ATM-SN-001', 'ATM-001-NY', 'active'),
    ('ATM', 'ATM-SN-002', 'ATM-002-SF', 'active'),
    ('ATM', 'ATM-SN-003', 'ATM-003-CHI', 'maintenance'),
    ('POS', 'POS-SN-001', 'POS-001-TechCorp', 'active'),
    ('POS', 'POS-SN-002', 'POS-002-GreenFarm', 'active'),
    ('MOBILE_APP', 'MOB-001', 'iPhone12-JohnS', 'active'),
    ('MOBILE_APP', 'MOB-002', 'Android-EmmaJ', 'active'),
    ('WEB_BROWSER', 'WEB-001', 'Chrome-MichaelB', 'active'),
    ('TELLER_TERMINAL', 'TERM-001', 'TERM-BR001', 'active'),
    ('TELLER_TERMINAL', 'TERM-002', 'TERM-BR002', 'deactivated');

/* =========================================================
   ATM DATA
========================================================= */
INSERT INTO atm.atm
    (branch_id, device_id, city, address, status, establish_date)
VALUES
    (1, 1, 'New York', '1 Wall Street Lobby, NY 10005', 'active', '2015-01-01'),
    (2, 2, 'San Francisco', '200 Market St Entrance, CA 94105', 'active', '2017-06-01'),
    (3, 3, 'Chicago', '400 Michigan Ave Mall, IL 60611', 'maintenance', '2019-03-01'),
    (4, 6, 'Houston', '800 Texas Ave Plaza, TX 77002', 'active', '2020-01-15'),
    (5, 7, 'Miami', '100 Ocean Dr Sidewalk, FL 33139', 'inactive', '2018-11-01'),
    (6, 8, 'Seattle', '300 Pike St Corner, WA 98101', 'active', '2016-04-01'),
    (7, 9, 'Boston', '50 State St Building, MA 02109', 'active', '2014-07-15'),
    (8, 10, 'Denver', '1600 Broadway Mall, CO 80202', 'active', '2018-08-20'),
    (NULL, 4, 'Portland', '500 Pioneer Sq Kiosk, OR 97204', 'active', '2019-05-10'),
    (1, 5, 'New York', '50 Broadway Subway, NY 10006', 'active', '2020-09-01');

-- ATM Cash
INSERT INTO atm.atm_cash
    (atm_id, currency_id, amount)
VALUES
    (1, 1, 50000.00),
    (2, 1, 75000.00),
    (3, 1, 25000.00),
    (4, 1, 100000.00),
    (5, 1, 0.00),
    (6, 1, 60000.00),
    (7, 1, 45000.00),
    (8, 1, 80000.00),
    (9, 1, 30000.00),
    (10, 1, 55000.00);

/* =========================================================
   CARD DATA
========================================================= */
INSERT INTO card.card
    (card_number, account_id, expire_date, cvv2, pin_hash, second_pin_hash, status)
VALUES
    ('4532789012345678', 1, '2027-12-31', HASHBYTES('SHA2_256', '123'), HASHBYTES('SHA2_256', '1234'), NULL, 'active'),
    ('5214567890123456', 2, '2027-08-31', HASHBYTES('SHA2_256', '456'), HASHBYTES('SHA2_256', '5678'), NULL, 'active'),
    ('3456123498765432', 3, '2027-03-31', HASHBYTES('SHA2_256', '789'), HASHBYTES('SHA2_256', '9012'), NULL, 'active'),
    ('6011234567890123', 4, '2027-11-30', HASHBYTES('SHA2_256', '012'), HASHBYTES('SHA2_256', '3456'), HASHBYTES('SHA2_256', '7890'), 'active'),
    ('4556789012345678', 5, '2027-06-30', HASHBYTES('SHA2_256', '345'), HASHBYTES('SHA2_256', '7890'), NULL, 'active'),
    ('5212789012345678', 6, '2027-01-31', HASHBYTES('SHA2_256', '678'), HASHBYTES('SHA2_256', '1234'), NULL, 'blocked'),
    ('3456890123456789', 7, '2027-09-30', HASHBYTES('SHA2_256', '901'), HASHBYTES('SHA2_256', '5678'), NULL, 'active'),
    ('6011345678901234', 8, '2027-04-30', HASHBYTES('SHA2_256', '234'), HASHBYTES('SHA2_256', '9012'), NULL, 'cancelled'),
    ('4532890123456789', 10, '2028-02-28', HASHBYTES('SHA2_256', '567'), HASHBYTES('SHA2_256', '3456'), NULL, 'active'),
    ('5212890123456789', 9, '2027-10-31', HASHBYTES('SHA2_256', '890'), HASHBYTES('SHA2_256', '7890'), HASHBYTES('SHA2_256', '0123'), 'active');

/* =========================================================
   POS DATA
========================================================= */
INSERT INTO device.pos
    (device_id, customer_id, branch_id, register_address, register_date, status)
VALUES
    (4, 6, 2, '100 Innovation Way, SF, CA 94105', '2022-01-15', 'active'),
    (5, 7, 10, '200 Rural Route, Portland, OR 97201', '2022-03-20', 'active');

-- Registered devices
INSERT INTO device.registered_device
    (customer_id, device_id, status)
VALUES
    (1, 6, 'active'),
    (2, 7, 'active'),
    (3, 8, 'active');

/* =========================================================
   TRANSACTIONS DATA
========================================================= */
INSERT INTO trx.transactions
    (reference_code, source_account_id, target_account_id, device_id, transaction_type, amount, transaction_status, description, issued_at, completed_at)
VALUES
    ('TRX-2024-0001', 1, 2, NULL, 'transfer', 1500.00, 'successful', 'Rent payment for January', '2024-01-05 10:30:00', '2024-01-05 10:30:05'),
    ('TRX-2024-0002', 2, NULL, 1, 'withdraw', 500.00, 'successful', 'ATM withdrawal NYC', '2024-01-10 14:15:00', '2024-01-10 14:15:30'),
    ('TRX-2024-0003', NULL, 3, NULL, 'deposit', 10000.00, 'successful', 'Salary deposit', '2024-02-01 09:00:00', '2024-02-01 09:00:10'),
    ('TRX-2024-0004', 4, NULL, 4, 'purchase', 2500.00, 'successful', 'Office supplies from TechCorp', '2024-02-15 11:20:00', '2024-02-15 11:20:45'),
    ('TRX-2024-0005', 2, 5, NULL, 'transfer', 5000.00, 'successful', 'Investment transfer', '2024-03-01 08:45:00', '2024-03-01 08:45:15'),
    ('TRX-2024-0006', 7, 8, NULL, 'bill_payment', 3500.00, 'successful', 'Monthly utility payment', '2024-03-10 16:00:00', '2024-03-10 16:00:20'),
    ('TRX-2024-0007', 5, NULL, 2, 'withdraw', 1000.00, 'successful', 'ATM withdrawal SF', '2024-03-20 12:30:00', '2024-03-20 12:30:25'),
    ('TRX-2024-0008', NULL, 6, NULL, 'deposit', 500.00, 'pending', 'Check deposit pending clearance', '2024-04-01 10:00:00', NULL),
    ('TRX-2024-0009', 1, 10, NULL, 'transfer', 2000.00, 'failed', 'Transfer failed - insufficient funds check', '2024-04-15 09:15:00', NULL),
    ('TRX-2024-0010', 10, NULL, 9, 'purchase', 15000.00, 'successful', 'Stock purchase', '2024-05-01 14:00:00', '2024-05-01 14:00:30');

/* =========================================================
   CHECKBOOK DATA
========================================================= */
INSERT INTO cheque.checkbook
    (account_id, branch_id, issue_date, number_of_checks, status)
VALUES
    (2, 1, '2023-06-01', 50, 'active'),
    (4, 2, '2023-08-15', 100, 'active'),
    (7, 3, '2023-09-01', 25, 'active'),
    (2, 1, '2023-12-01', 50, 'issued'),
    (4, 2, '2024-01-15', 100, 'active'),
    (7, 3, '2024-02-01', 50, 'cancelled'),
    (3, 4, '2024-03-01', 25, 'active'),
    (8, 5, '2024-03-15', 50, 'closed'),
    (10, 6, '2024-04-01', 100, 'active'),
    (1, 7, '2024-04-15', 25, 'active');

-- Check papers
INSERT INTO cheque.check_paper
    (check_number, checkbook_id, drawer_account_id, payer_account_id, amount, issued_at, expire_date, cleared_date, status)
VALUES
    ('CHK-1001', 1, 2, 1, 2500.00, '2024-01-05 10:00:00', '2024-07-05', '2024-01-06', 'cashed'),
    ('CHK-1002', 1, 2, 3, 1500.00, '2024-02-10 14:00:00', '2024-08-10', '2024-02-11', 'cashed'),
    ('CHK-2001', 2, 4, 5, 5000.00, '2024-03-01 09:00:00', '2024-09-01', '2024-03-02', 'cashed'),
    ('CHK-2002', 2, 4, 6, 7500.00, '2024-03-15 11:00:00', '2024-09-15', NULL, 'bounced'),
    ('CHK-3001', 3, 7, 8, 3000.00, '2024-04-01 08:00:00', '2024-10-01', '2024-04-02', 'cashed'),
    ('CHK-1003', 1, 2, 4, 1000.00, '2024-04-10 15:00:00', '2024-10-10', NULL, 'issued'),
    ('CHK-2003', 2, 4, 1, 8500.00, '2024-05-01 10:00:00', '2024-11-01', '2024-05-02', 'cashed'),
    ('CHK-4001', 5, 7, 6, 2000.00, '2024-05-15 13:00:00', '2024-11-15', NULL, 'cancelled'),
    ('CHK-5001', 6, 3, 2, 4500.00, '2024-06-01 09:00:00', '2024-12-01', '2024-06-02', 'cashed'),
    ('CHK-6001', 7, 3, 7, 1800.00, '2024-06-15 11:00:00', '2024-12-15', NULL, 'issued');

/* =========================================================
   LOAN DATA
========================================================= */
INSERT INTO loan.loan
    (account_id, guarantor_customer_id, loan_type, amount, interest_rate, loan_term_months, repayment_status, issue_date)
VALUES
    (9, 6, 'Business Expansion', 250000.00, 5.50, 60, 'active', '2023-01-15'),
    (1, 1, 'Personal Loan', 15000.00, 8.25, 36, 'active', '2024-01-10'),
    (2, 3, 'Home Mortgage', 350000.00, 3.75, 360, 'active', '2023-06-01'),
    (3, 7, 'Agriculture Equipment', 75000.00, 4.50, 48, 'active', '2024-02-15'),
    (4, 8, 'Hotel Renovation', 500000.00, 6.00, 120, 'active', '2023-09-01'),
    (5, 2, 'Auto Loan', 35000.00, 4.25, 60, 'completed', '2021-03-15'),
    (6, 4, 'Education Loan', 45000.00, 5.75, 84, 'active', '2023-08-01'),
    (7, 10, 'Personal Loan', 25000.00, 7.50, 48, 'defaulted', '2022-05-20'),
    (8, 5, 'Small Business', 100000.00, 6.50, 72, 'active', '2024-03-01'),
    (9, 9, 'Home Improvement', 55000.00, 4.75, 120, 'active', '2024-04-15');

/* =========================================================
   FACILITY DATA
========================================================= */
INSERT INTO loan.facility
    (account_id, facility_type, credit_limit, interest_rate, period_months, status)
VALUES
    (4, 'Business Overdraft', 50000.00, 12.50, 12, 'active'),
    (7, 'Business Line of Credit', 100000.00, 8.25, 24, 'active'),
    (9, 'Loan Facility', 250000.00, 5.50, 60, 'active'),
    (2, 'Personal Overdraft', 5000.00, 15.00, 12, 'active'),
    (3, 'Credit Card Facility', 10000.00, 18.99, 12, 'suspended'),
    (10, 'Investment Credit Line', 150000.00, 6.75, 24, 'active'),
    (10, 'Corporate Credit Facility', 500000.00, 4.50, 36, 'active'),
    (1, 'Personal Line of Credit', 20000.00, 10.25, 12, 'closed'),
    (5, 'Investment Overdraft', 25000.00, 9.50, 12, 'active'),
    (8, 'Business Credit Card', 75000.00, 14.99, 12, 'active');

/* =========================================================
   MESSAGE DATA
========================================================= */
INSERT INTO message.message
    (customer_id, subject, body, message_status, created_at, read_at)
VALUES
    (1, 'Welcome to BankSystem!', 'Dear John, welcome to our banking family. Your account is now active.', 'read', '2024-01-05 09:00:00', '2024-01-05 10:30:00'),
    (2, 'Monthly Statement Available', 'Your January 2024 statement is now available for viewing.', 'read', '2024-02-01 08:00:00', '2024-02-02 15:00:00'),
    (3, 'New Interest Rates', 'We have updated our savings account interest rates. Click to learn more.', 'unread', '2024-03-01 10:00:00', NULL),
    (4, 'Account Security Alert', 'We detected a login from a new device. Please verify this activity.', 'unread', '2024-03-15 14:30:00', NULL),
    (6, 'Business Account Upgrade', 'Congratulations! Your business account qualifies for premium services.', 'read', '2024-04-01 11:00:00', '2024-04-01 16:00:00'),
    (7, 'Loan Pre-Approval', 'You have been pre-approved for an agriculture expansion loan.', 'archived', '2024-05-01 09:00:00', '2024-05-02 10:00:00'),
    (8, 'Annual Report Available', 'Your annual business banking report is ready for download.', 'deleted', '2024-05-15 08:00:00', NULL),
    (10, 'Investment Opportunity', 'New investment products are available for high-net-worth clients.', 'read', '2024-06-01 12:00:00', '2024-06-01 14:00:00'),
    (1, 'Card Renewal Notice', 'Your debit card expires in 3 months. Please order a replacement.', 'unread', '2024-06-15 09:00:00', NULL),
    (5, 'Account Dormancy Notice', 'Your account has been inactive for 12 months. Please make a transaction.', 'unread', '2024-07-01 10:00:00', NULL);

/* =========================================================
   ONLINE PAYMENT DATA
========================================================= */
INSERT INTO payment.online_payment
    (customer_id, amount, reference_code, provider_name, payment_status, created_at, completed_at)
VALUES
    (1, 250.00, 'PAY-2024-001', 'Electric Company', 'successful', '2024-01-15 10:00:00', '2024-01-15 10:01:00'),
    (2, 89.99, 'PAY-2024-002', 'Internet Provider', 'successful', '2024-02-01 09:00:00', '2024-02-01 09:00:30'),
    (3, 1500.00, 'PAY-2024-003', 'Rent Payment', 'successful', '2024-02-28 08:00:00', '2024-02-28 08:01:00'),
    (6, 5000.00, 'PAY-2024-004', 'Cloud Services Inc.', 'successful', '2024-03-10 14:00:00', '2024-03-10 14:00:45'),
    (7, 350.00, 'PAY-2024-005', 'Water Utility', 'pending', '2024-03-25 11:00:00', NULL),
    (8, 2500.00, 'PAY-2024-006', 'Insurance Corp', 'successful', '2024-04-05 10:00:00', '2024-04-05 10:01:15'),
    (10, 750.00, 'PAY-2024-007', 'Credit Card Payment', 'successful', '2024-04-20 09:00:00', '2024-04-20 09:00:30'),
    (1, 125.50, 'PAY-2024-008', 'Phone Bill', 'failed', '2024-05-01 08:00:00', NULL),
    (4, 3200.00, 'PAY-2024-009', 'Property Tax', 'successful', '2024-05-15 12:00:00', '2024-05-15 12:01:00'),
    (3, 450.00, 'PAY-2024-010', 'Gym Membership', 'reversed', '2024-06-01 07:00:00', '2024-06-02 10:00:00');

/* =========================================================
   LEDGER ACCOUNT DATA
========================================================= */
INSERT INTO ledger.ledger_account
    (account_code, account_name, parent_ledger_account_id, status)
VALUES
    ('1000', 'Assets', NULL, 'active'),
    ('1100', 'Cash and Cash Equivalents', 1, 'active'),
    ('1110', 'Vault Cash', 2, 'active'),
    ('1120', 'Bank Deposits', 2, 'active'),
    ('1200', 'Loans and Advances', 1, 'active'),
    ('1210', 'Personal Loans', 5, 'active'),
    ('1220', 'Business Loans', 5, 'active'),
    ('1300', 'Fixed Assets', 1, 'active'),
    ('2000', 'Liabilities', NULL, 'active'),
    ('2100', 'Customer Deposits', 9, 'active');

/* =========================================================
   AUDIT LOG DATA (Sample entries)
========================================================= */
INSERT INTO security.audit_log
    (entity_type, entity_id, action_type, performed_by_user_id, details)
VALUES
    ('customer', 1, 'CREATE', 1, 'New customer account created for John Smith'),
    ('account', 1, 'CREATE', 1, 'Savings account opened with initial deposit of 25000'),
    ('transaction', 1, 'COMPLETE', 1, 'Transfer of 1500 completed successfully'),
    ('customer', 2, 'UPDATE', 2, 'Customer email updated'),
    ('account', 3, 'UPDATE', 3, 'Account balance updated after deposit'),
    ('card', 1, 'ISSUE', 1, 'Debit card issued to John Smith'),
    ('loan', 1, 'APPROVE', 4, 'Business expansion loan approved for 250000'),
    ('account', 6, 'STATUS_CHANGE', 5, 'Account status changed to dormant'),
    ('transaction', 9, 'FAIL', NULL, 'Transfer failed due to insufficient funds'),
    ('customer', 9, 'SUSPEND', 6, 'Account suspended due to suspicious activity');

/* =========================================================
   ENTITY VERSION DATA
========================================================= */
INSERT INTO security.entity_version
    (entity_type, entity_id, version_no, changed_by_user_id, payload)
VALUES
    ('customer', 1, 1, 1, '{"name": "John Smith", "status": "active", "created": "2024-01-05"}'),
    ('customer', 1, 2, 1, '{"name": "John Smith", "phone": "+1-555-0101", "status": "active"}'),
    ('account', 1, 1, 1, '{"account_number": "1000123456789001", "balance": 25000, "status": "active"}'),
    ('account', 1, 2, 1, '{"account_number": "1000123456789001", "balance": 23500, "status": "active"}'),
    ('transaction', 1, 1, 1, '{"type": "transfer", "amount": 1500, "status": "pending"}'),
    ('transaction', 1, 2, 1, '{"type": "transfer", "amount": 1500, "status": "successful"}'),
    ('loan', 1, 1, 4, '{"type": "Business Expansion", "amount": 250000, "status": "pending"}'),
    ('loan', 1, 2, 4, '{"type": "Business Expansion", "amount": 250000, "status": "active"}'),
    ('card', 1, 1, 1, '{"card_type": "debit", "status": "issued", "account_id": 1}'),
    ('customer', 2, 1, 1, '{"name": "Emma Johnson", "status": "active", "created": "2024-01-05"}');

/* =========================================================
   ACCOUNT BALANCE HISTORY
========================================================= */
INSERT INTO ledger.account_balance_history
    (account_id, old_balance, new_balance, changed_by_transaction_id)
VALUES
    (1, 0.00, 25000.00, NULL),
    (2, 0.00, 150000.00, NULL),
    (3, 0.00, 50000.00, NULL),
    (1, 25000.00, 23500.00, 1),
    (2, 150000.00, 151500.00, 1),
    (3, 50000.00, 60000.00, 3),
    (2, 151500.00, 146500.00, 5),
    (5, 75000.00, 80000.00, 5),
    (5, 80000.00, 79000.00, 7),
    (1, 23500.00, 25500.00, 9);

/* =========================================================
   TRANSACTION STATUS HISTORY
========================================================= */
INSERT INTO ledger.transaction_status_history
    (transaction_id, old_status, new_status, note)
VALUES
    (1, 'pending', 'successful', 'Transfer processed successfully'),
    (3, 'pending', 'successful', 'Deposit confirmed'),
    (4, 'pending', 'successful', 'Purchase approved'),
    (7, 'pending', 'successful', 'Withdrawal completed'),
    (8, 'pending', 'pending', 'Awaiting check clearance'),
    (9, 'pending', 'failed', 'Insufficient funds in source account'),
    (10, 'pending', 'successful', 'Stock purchase completed'),
    (2, 'pending', 'successful', 'ATM withdrawal processed'),
    (5, 'pending', 'successful', 'Transfer completed'),
    (6, 'pending', 'successful', 'Bill payment processed');