/* Create Roles */
CREATE ROLE BankAppUser;
-- The role for the application's service account
CREATE ROLE BankTeller;
-- For branch staff
CREATE ROLE BankAuditor;
-- For internal compliance
CREATE ROLE BankManager;
-- For branch management

/* 1. Permissions for the Application (The Service Account) */
-- The application needs to read/write transactions, accounts, and customers
GRANT SELECT, INSERT, UPDATE ON SCHEMA::account TO BankAppUser;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::trx TO BankAppUser;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::customer TO BankAppUser;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::device TO BankAppUser;
GRANT SELECT, INSERT ON SCHEMA::ledger TO BankAppUser;

/* 2. Permissions for Tellers */
GRANT SELECT ON SCHEMA::account TO BankTeller;
GRANT SELECT, INSERT ON SCHEMA::trx TO BankTeller;
GRANT SELECT ON SCHEMA::customer TO BankTeller;

/* 3. Permissions for Auditors (READ ONLY) */
GRANT SELECT ON SCHEMA::account TO BankAuditor;
GRANT SELECT ON SCHEMA::customer TO BankAuditor;
GRANT SELECT ON SCHEMA::trx TO BankAuditor;
GRANT SELECT ON SCHEMA::ledger TO BankAuditor;
GRANT SELECT ON SCHEMA::loan TO BankAuditor;

/* Revoke access to sensitive logic where necessary */
REVOKE DELETE ON SCHEMA::account TO BankAppUser;
REVOKE DELETE ON SCHEMA::trx TO BankAppUser;
