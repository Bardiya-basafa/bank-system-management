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

-- DEVICES
CREATE OR ALTER FUNCTION device.fn_GetDeviceMetricsSummary()
RETURNS @DeviceSummary TABLE
(
    device_type VARCHAR(20),
    total_devices INT,
    active_count INT,
    maintenance_count INT,
    total_atm_cash_held DECIMAL(18,2),
    assigned_to_customers INT,
    assigned_to_branches INT
)
AS
BEGIN
    INSERT INTO @DeviceSummary
    SELECT
        d.device_type,
        COUNT(d.device_id) AS total_devices,
        SUM(CASE WHEN d.status = 'active' THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN d.status = 'maintenance' THEN 1 ELSE 0 END) AS maintenance_count,
        -- Aggregates ATM vault cash across currencies
        ISNULL((SELECT SUM(ac.amount)
        FROM atm.atm_cash ac
            INNER JOIN atm.atm a ON ac.atm_id = a.atm_id
        WHERE a.device_id IN (SELECT device_id
        FROM device.device
        WHERE device_type = 'ATM')), 0) AS total_atm_cash_held,
        -- Counts distinct bindings to customers
        COUNT(DISTINCT p.customer_id) + COUNT(DISTINCT rd.customer_id) AS assigned_to_customers,
        -- Counts distinct physical bindings to bank
        COUNT(DISTINCT a.branch_id) + COUNT(DISTINCT p.branch_id) AS assigned_to_branches
    FROM device.device d
        LEFT JOIN atm.atm a ON d.device_id = a.device_id
        LEFT JOIN device.pos p ON d.device_id = p.device_id
        LEFT JOIN device.registered_device rd ON d.device_id = rd.device_id
    GROUP BY d.device_type;

    RETURN;
END;
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
    -- Line of credit facilities
    COUNT(DISTINCT f.facility_id) AS active_facilities,
    ISNULL(SUM(f.credit_limit), 0) AS aggregate_credit_limit,
    -- Cheque clearance processing
    COUNT(DISTINCT cb.checkbook_id) AS checkbooks_allocated,
    COUNT(DISTINCT cp.check_id) AS total_checks_written,
    ISNULL(SUM(CASE WHEN cp.status = 'bounced' THEN cp.amount ELSE 0 END), 0) AS total_bounced_value
FROM account.account a
    LEFT JOIN loan.loan l ON a.account_id = l.account_id AND l.repayment_status = 'active'
    LEFT JOIN loan.facility f ON a.account_id = f.account_id AND f.status = 'active'
    LEFT JOIN cheque.checkbook cb ON a.account_id = cb.account_id
    LEFT JOIN cheque.check_paper cp ON a.account_id = cp.drawer_account_id
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
    COUNT(DISTINCT m.message_id) AS secure_messages_sent,
    COUNT(DISTINCT op.online_payment_id) AS online_payment_attempts,
    ISNULL(SUM(op.amount), 0) AS total_processed_payment_value,
    -- Security Footprint
    COUNT(DISTINCT al.log_id) AS logged_security_actions,
    COUNT(DISTINCT ev.version_id) AS entity_state_mutations
FROM customer.customer c
    LEFT JOIN customer.individual_customer ic ON c.customer_id = ic.customer_id
    LEFT JOIN customer.organization_customer oc ON c.customer_id = oc.customer_id
    LEFT JOIN account.account_owner ao ON c.customer_id = ao.customer_id
    LEFT JOIN card.card card ON ao.account_id = card.account_id
    LEFT JOIN message.message m ON c.customer_id = m.customer_id
    LEFT JOIN payment.online_payment op ON c.customer_id = op.customer_id
    LEFT JOIN security.audit_log al ON al.entity_type = 'customer' AND al.entity_id = c.customer_id
    LEFT JOIN security.entity_version ev ON ev.entity_type = 'customer' AND ev.entity_id = c.customer_id
GROUP BY c.customer_id, c.customer_type, c.status, ic.first_name, ic.last_name, oc.organization_name
);
GO