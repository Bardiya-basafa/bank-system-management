USE BankSystemV1;
GO

-- BRANCH & STAFF
CREATE OR ALTER FUNCTION branch.fn_GetBranchStaffSummary()
RETURNS TABLE
AS
RETURN
(
    SELECT
    b.branch_id,
    b.branch_code,
    b.branch_name,
    b.city,
    COUNT(s.staff_id) AS total_staff,
    SUM(CASE WHEN s.status = 'active' THEN 1 ELSE 0 END) AS active_staff,
    SUM(CASE WHEN s.role = 'manager' THEN 1 ELSE 0 END) AS manager_count,
    MAX(s.hire_date) AS latest_hire_date
FROM branch.branch b
    LEFT JOIN staff.staff s ON b.branch_id = s.branch_id
GROUP BY b.branch_id, b.branch_code, b.branch_name, b.city
);
GO

-- DEBT, LIABILITIES, AND COMMITTED FUND ANALYTICS
CREATE OR ALTER FUNCTION loan.fn_GetLiabilityAndPaperSummary()
RETURNS TABLE
AS
RETURN
(
    SELECT
    a.account_number,
    a.account_type,
    -- Loan aggregation
    COUNT(DISTINCT l.loan_id) AS total_loans_issued,
    ISNULL(SUM(l.amount), 0) AS aggregate_loan_principal,
    ISNULL(AVG(l.interest_rate), 0) AS average_loan_rate,
    -- Cheque clearance processing
    COUNT(DISTINCT cb.checkbook_id) AS checkbooks_allocated,
    COUNT(DISTINCT cp.check_id) AS total_checks_written,
    ISNULL(SUM(CASE WHEN cp.status = 'bounced' THEN cp.amount ELSE 0 END), 0) AS total_bounced_value
FROM account.account a
    LEFT JOIN loan.loan l ON a.account_id = l.account_id AND l.repayment_status = 'active'
    LEFT JOIN cheque.checkbook cb ON a.account_id = cb.account_id
    LEFT JOIN cheque.check_paper cp ON cp.checkbook_id = cb.checkbook_id
GROUP BY a.account_number, a.account_type
);
GO

-- CUSTOMER ENGAGEMENT
CREATE OR ALTER FUNCTION customer.fn_GetCustomerEngagementOverview()
RETURNS TABLE
AS
RETURN
(
    SELECT
    c.customer_id,
    c.customer_type,
    c.status AS registration_status,
    -- Checks configuration differences between Individuals and Organizations
    COALESCE(ic.first_name + ' ' + ic.last_name, oc.organization_name) AS entity_display_name,
    -- Account attachment count
    COUNT(DISTINCT ao.account_id) AS active_accounts_owned,
    -- Cards provisioned
    COUNT(DISTINCT card.card_id) AS plastic_cards_issued,
    -- Customer interactions
    COUNT(DISTINCT m.message_id) AS secure_messages_sent
FROM customer.customer c
    LEFT JOIN customer.individual_customer ic ON c.customer_id = ic.customer_id
    LEFT JOIN customer.organization_customer oc ON c.customer_id = oc.customer_id
    LEFT JOIN account.account_owner ao ON c.customer_id = ao.customer_id
    LEFT JOIN card.card card ON ao.account_id = card.account_id
    LEFT JOIN message.message m ON c.customer_id = m.customer_id
GROUP BY c.customer_id, c.customer_type, c.status, ic.first_name, ic.last_name, oc.organization_name
);
GO