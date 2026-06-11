
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
