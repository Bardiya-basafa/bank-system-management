/* Create Roles */
CREATE ROLE Admin;
-- The role for the application's service account
CREATE ROLE Teller;
-- For branch staff
CREATE ROLE Customer;
-- For internal compliance
CREATE ROLE Manager;
-- For branch management

/* 1. Permissions for the Application (The Service Account) */
-- The application needs to read/write transactions, accounts, and customers
GRANT SELECT, INSERT, UPDATE ON SCHEMA::account TO Admin;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::trx TO Admin;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::customer TO Admin;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::device TO Admin;
GRANT SELECT, INSERT ON SCHEMA::ledger TO Admin;

GRANT SELECT, INSERT, UPDATE ON SCHEMA::account TO Manager;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::trx TO Manager;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::customer TO Manager;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::device TO Manager;
GRANT SELECT, INSERT ON SCHEMA::ledger TO Manager;

/* 2. Permissions for Tellers */
GRANT SELECT ON SCHEMA::account TO Teller;
GRANT SELECT, INSERT ON SCHEMA::trx TO Teller;
GRANT SELECT ON SCHEMA::customer TO Teller;

/* 3. Permissions for Auditors (READ ONLY) */
GRANT SELECT ON SCHEMA::account TO Customer;
GRANT SELECT ON SCHEMA::customer TO Customer;
GRANT SELECT ON SCHEMA::trx TO Customer;
GRANT SELECT ON SCHEMA::ledger TO Customer;
GRANT SELECT ON SCHEMA::loan TO Customer;

/* Revoke access to sensitive logic where necessary */
REVOKE DELETE ON SCHEMA::account TO Admin;
REVOKE DELETE ON SCHEMA::trx TO Admin;
