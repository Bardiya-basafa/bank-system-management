USE BankSystemV1;
GO

DECLARE @FromDate date = '2026-01-01';
DECLARE @ToDate   date = '2026-01-31';

DECLARE @StartDateTime datetime2 = CAST(@FromDate AS datetime2);
DECLARE @EndDateTime   datetime2 = DATEADD(DAY, 1, CAST(@ToDate AS datetime2));

/* =========================================================
   SUCCESSFUL TRANSACTIONS IN PERIOD
========================================================= */
IF OBJECT_ID('tempdb..#tx') IS NOT NULL DROP TABLE #tx;

SELECT
    t.transaction_id,
    COALESCE(t.completed_at, t.issued_at) AS txn_at,
    t.transaction_type,
    t.amount
INTO #tx
FROM trx.transactions t
WHERE t.transaction_status = 'successful'
    AND COALESCE(t.completed_at, t.issued_at) >= @StartDateTime
    AND COALESCE(t.completed_at, t.issued_at) <  @EndDateTime;

/* =========================================================
   ACCOUNT SNAPSHOT BY CURRENCY
========================================================= */
IF OBJECT_ID('tempdb..#account_agg') IS NOT NULL DROP TABLE #account_agg;

SELECT
    a.currency_id,
    COUNT(*) AS total_accounts,
    SUM(CASE WHEN a.account_status = 'active' THEN 1 ELSE 0 END)   AS active_accounts,
    SUM(CASE WHEN a.account_status = 'blocked' THEN 1 ELSE 0 END)  AS blocked_accounts,
    SUM(CASE WHEN a.account_status = 'dormant' THEN 1 ELSE 0 END)   AS dormant_accounts,
    SUM(CASE WHEN a.account_status = 'closed' THEN 1 ELSE 0 END)    AS closed_accounts,
    CAST(SUM(a.balance) AS decimal(18,2)) AS total_customer_balances,
    CAST(SUM(CASE WHEN a.account_type = 'saving'        THEN a.balance ELSE 0 END) AS decimal(18,2)) AS saving_balance,
    CAST(SUM(CASE WHEN a.account_type = 'current'       THEN a.balance ELSE 0 END) AS decimal(18,2)) AS current_balance,
    CAST(SUM(CASE WHEN a.account_type = 'business'      THEN a.balance ELSE 0 END) AS decimal(18,2)) AS business_balance,
    CAST(SUM(CASE WHEN a.account_type = 'loan_facility' THEN a.balance ELSE 0 END) AS decimal(18,2)) AS loan_facility_balance,
    CAST(SUM(CASE WHEN a.account_type = 'investment'    THEN a.balance ELSE 0 END) AS decimal(18,2)) AS investment_balance
INTO #account_agg
FROM account.account a
GROUP BY a.currency_id;

/* =========================================================
   LOAN SNAPSHOT BY CURRENCY
========================================================= */
IF OBJECT_ID('tempdb..#loan_agg') IS NOT NULL DROP TABLE #loan_agg;

SELECT
    a.currency_id,
    COUNT(*) AS loan_count,
    CAST(SUM(CASE WHEN l.repayment_status = 'active'    THEN l.amount ELSE 0 END) AS decimal(18,2)) AS active_loan_principal,
    CAST(SUM(CASE WHEN l.repayment_status = 'completed' THEN l.amount ELSE 0 END) AS decimal(18,2)) AS completed_loan_principal,
    CAST(SUM(CASE WHEN l.repayment_status = 'defaulted'  THEN l.amount ELSE 0 END) AS decimal(18,2)) AS defaulted_loan_principal
INTO #loan_agg
FROM loan.loan l
    INNER JOIN account.account a
    ON a.account_id = l.account_id
GROUP BY a.currency_id;

/* =========================================================
   ATM CASH BY CURRENCY
========================================================= */
IF OBJECT_ID('tempdb..#atm_agg') IS NOT NULL DROP TABLE #atm_agg;

SELECT
    ac.currency_id,
    CAST(SUM(ac.amount) AS decimal(18,2)) AS atm_cash
INTO #atm_agg
FROM atm.atm_cash ac
GROUP BY ac.currency_id;

/* =========================================================
   1) EXECUTIVE SUMMARY
========================================================= */
SELECT
    @FromDate AS report_from,
    @ToDate   AS report_to,
    (SELECT COUNT(*)
    FROM customer.customer) AS total_customers,
    (SELECT SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END)
    FROM customer.customer) AS active_customers,
    (SELECT COUNT(*)
    FROM #tx) AS successful_transactions,
    CAST((SELECT COALESCE(SUM(amount), 0)
    FROM #tx) AS decimal(18,2)) AS successful_transaction_volume,
    CAST((SELECT COALESCE(SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END), 0)
    FROM #tx) AS decimal(18,2)) AS deposit_volume,
    CAST((SELECT COALESCE(SUM(CASE WHEN transaction_type = 'withdraw' THEN amount ELSE 0 END), 0)
    FROM #tx) AS decimal(18,2)) AS withdraw_volume,
    CAST((SELECT COALESCE(SUM(CASE WHEN transaction_type = 'transfer' THEN amount ELSE 0 END), 0)
    FROM #tx) AS decimal(18,2)) AS transfer_volume,
    CAST((SELECT COALESCE(SUM(CASE WHEN transaction_type = 'purchase' THEN amount ELSE 0 END), 0)
    FROM #tx) AS decimal(18,2)) AS purchase_volume,
    CAST((SELECT COALESCE(SUM(CASE WHEN transaction_type = 'bill_payment' THEN amount ELSE 0 END), 0)
    FROM #tx) AS decimal(18,2)) AS bill_payment_volume,
    CAST(
        (SELECT COALESCE(SUM(CASE WHEN transaction_type = 'deposit' THEN amount ELSE 0 END), 0)
    FROM #tx)
      - (SELECT COALESCE(SUM(CASE WHEN transaction_type IN ('withdraw', 'purchase', 'bill_payment') THEN amount ELSE 0 END), 0)
    FROM #tx)
      AS decimal(18,2)
    ) AS net_external_cash_flow;

/* =========================================================
   2) FINANCIAL POSITION BY CURRENCY
   Note: currencies are not mixed because no FX table exists.
========================================================= */
SELECT
    c.currency_code,
    c.currency_name,
    ISNULL(a.total_accounts, 0) AS total_accounts,
    ISNULL(a.active_accounts, 0) AS active_accounts,
    ISNULL(a.blocked_accounts, 0) AS blocked_accounts,
    ISNULL(a.dormant_accounts, 0) AS dormant_accounts,
    ISNULL(a.closed_accounts, 0) AS closed_accounts,
    CAST(ISNULL(a.total_customer_balances, 0) AS decimal(18,2)) AS customer_deposits_liability,
    CAST(ISNULL(a.saving_balance, 0) AS decimal(18,2)) AS saving_balance,
    CAST(ISNULL(a.current_balance, 0) AS decimal(18,2)) AS current_balance,
    CAST(ISNULL(a.business_balance, 0) AS decimal(18,2)) AS business_balance,
    CAST(ISNULL(a.loan_facility_balance, 0) AS decimal(18,2)) AS loan_facility_balance,
    CAST(ISNULL(a.investment_balance, 0) AS decimal(18,2)) AS investment_balance,
    ISNULL(l.loan_count, 0) AS loan_count,
    CAST(ISNULL(l.active_loan_principal, 0) AS decimal(18,2)) AS active_loan_principal,
    CAST(ISNULL(l.completed_loan_principal, 0) AS decimal(18,2)) AS completed_loan_principal,
    CAST(ISNULL(l.defaulted_loan_principal, 0) AS decimal(18,2)) AS defaulted_loan_principal,
    CAST(ISNULL(atm.atm_cash, 0) AS decimal(18,2)) AS atm_cash,
    CAST(
        ISNULL(atm.atm_cash, 0)
      + ISNULL(l.active_loan_principal, 0)
      - ISNULL(a.total_customer_balances, 0)
      AS decimal(18,2)
    ) AS simplified_net_position
FROM currency.currency c
    LEFT JOIN #account_agg a ON a.currency_id = c.currency_id
    LEFT JOIN #loan_agg l ON l.currency_id = c.currency_id
    LEFT JOIN #atm_agg atm ON atm.currency_id = c.currency_id
ORDER BY c.currency_code;

/* =========================================================
   3) TRANSACTION BREAKDOWN
========================================================= */
SELECT
    transaction_type,
    COUNT(*) AS transaction_count,
    CAST(SUM(amount) AS decimal(18,2)) AS transaction_volume
FROM #tx
GROUP BY transaction_type
ORDER BY transaction_type;

/* =========================================================
   4) ACCOUNT TYPE BREAKDOWN
========================================================= */
SELECT
    CAST(SUM(saving_balance) AS decimal(18,2)) AS saving_total,
    CAST(SUM(current_balance) AS decimal(18,2)) AS current_total,
    CAST(SUM(business_balance) AS decimal(18,2)) AS business_total,
    CAST(SUM(loan_facility_balance) AS decimal(18,2)) AS loan_facility_total,
    CAST(SUM(investment_balance) AS decimal(18,2)) AS investment_total
FROM #account_agg;

/* =========================================================
   5) LOAN PORTFOLIO SUMMARY
========================================================= */
SELECT
    CAST(SUM(active_loan_principal) AS decimal(18,2)) AS active_loan_principal_total,
    CAST(SUM(completed_loan_principal) AS decimal(18,2)) AS completed_loan_principal_total,
    CAST(SUM(defaulted_loan_principal) AS decimal(18,2)) AS defaulted_loan_principal_total
FROM #loan_agg;

/* =========================================================
   6) ATM CASH SUMMARY
========================================================= */
SELECT
    CAST(SUM(atm_cash) AS decimal(18,2)) AS total_atm_cash
FROM #atm_agg;
