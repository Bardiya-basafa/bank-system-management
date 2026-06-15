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

CREATE TRIGGER trx.trg_CheckSourceBalance
ON trx.transactions
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check for insufficient balance
    IF EXISTS (
        SELECT 1
    FROM inserted i
        JOIN account.account a WITH (UPDLOCK, HOLDLOCK)
        ON a.account_id = i.source_account_id
    WHERE i.source_account_id IS NOT NULL
        AND i.transaction_type IN ('transfer','withdraw','purchase','bill_payment')
        AND a.balance < i.amount
    )
    BEGIN
        RAISERROR ('Insufficient balance in source account.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    -- If everything is valid, insert the rows
    INSERT INTO trx.transactions
        (
        reference_code,
        source_account_id,
        target_account_id,
        source_device_id,
        transaction_type,
        amount,
        transaction_status,
        description,
        issued_at,
        completed_at
        )
    SELECT
        reference_code,
        source_account_id,
        target_account_id,
        source_device_id,
        transaction_type,
        amount,
        transaction_status,
        description,
        issued_at,
        completed_at
    FROM inserted;
END;
GO
