-- Step 1: Create a Master Key
USE master;
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'Strong_Password_Here!';

-- Step 2: Create a Certificate
CREATE CERTIFICATE TDE_Cert WITH SUBJECT = 'BankSystemV1_Cert';

-- Step 3: Create the Database Encryption Key
USE BankSystemV1;
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDE_Cert;

-- Step 4: Enable Encryption
ALTER DATABASE BankSystemV1 SET ENCRYPTION ON;
GO
