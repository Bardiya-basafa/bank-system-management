CREATE VIEW customer_account
as
    SELECT c.customer_id, ac.*
    FROM customer.customer c
        JOIN account.account_owner a on  c.customer_id = a.customer_id
        JOIN account.account ac on ac.account_id = a.account_id
GO


-- customers with their owing accounts
SELECT c.*, ac.*
FROM customer.customer c
    JOIN account.account_owner a on  c.customer_id = a.customer_id
    JOIN account.account ac on ac.account_id = a.account_id

-- customers with active status
SELECT
    *
FROM customer.customer c
WHERE c.[status] = 'active'

-- find active card for a customer
SELECT
    c.*,
    cr.*
from customer_account c
    JOIN card.card cr on cr.account_id = c.account_id
WHERE c.customer_id = 1 AND cr.[status] = 'active'

-- select all information on specific customer
SELECT
    *
FROM customer.customer c
    JOIN customer.individual_customer ic on c.customer_id = ic.customer_id
    JOIN customer.organization_customer oc on c.customer_id = oc.customer_id

-- select customer with phone and email
SELECT
    *
FROM customer.customer c
WHERE c.email = 'email' AND c.phone = 'phone'

-- select customers with all their account owenerships
SELECT
    *
FROM customer.customer c
    JOIN account.account_owner ac on ac.customer_id = c.customer_id

-- select org customers with contact person info
SELECT
    *
FROM customer.organization_customer oc
    JOIN customer.individual_customer ic on ic.customer_id = oc.contact_person_id

-- select all under 18 customers
SELECT
    *
FROM customer.individual_customer c
WHERE DATEDIFF(year, CAST(c.birth_date as datetime) ,CAST(SYSDATETIME() as datetime)) < 18

-- select gaurneter of each loan
SELECT
    *
FROM loan.loan l
    JOIN customer.customer c ON l.guarantor_customer_id = c.customer_id
WHERE l.loan_id = 1

-- account detilas
SELECT
    *
FROM account.account a
    JOIN currency.currency c on a.currency_id = c.currency_id

-- all active accounts
SELECT
    *
FROM account.account a
WHERE a.account_status = 'active'

-- all not active accounts
SELECT
    *
FROM account.account a
WHERE a.account_status != 'active'

-- get all trasactions history for an account
SELECT
    *
FROM trx.transactions t
WHERE t.source_account_id = 1 OR t.target_account_id =1

-- get all transactions for a device
SELECT
    *
FROM trx.transactions t
WHERE t.target_account_id = 1

-- all pending transactions
SELECT
    *
FROM trx.transactions t
WHERE t.transaction_status = 'pending'

-- total amount of credit and debit on each account
SELECT
    t1.account_id,
    debit,
    credit
FROM
    (
SELECT
        t.target_account_id as account_id,
        SUM(amount) as credit
    FROM trx.transactions t
    WHERE t.transaction_status = 'successful'
    GROUP BY t.target_account_id)t1 JOIN
    (
SELECT
        t.source_account_id as account_id,
        SUM(amount) as debit
    FROM trx.transactions t
    WHERE t.transaction_status = 'successful'
    GROUP BY t.source_account_id)t2 on t1.account_id = t2.account_id

-- select inactive accounts with active cards
SELECT
    *
FROM card.card c
    JOIN account.account a on a.account_id = c.account_id
WHERE c.[status] = 'active' and a.account_status != 'active'

-- select all cards from a account
SELECT
    *
FROM card.card c
    JOIN account.account cc on cc.account_id = c.account_id
WHERE cc.account_id = 1

-- select card expire date within 30 days
SELECT
    *
FROM card.card c
WHERE DATEDIFF(day,CAST(SYSDATETIME() as datetime),CAST(c.expire_date as datetime)) BETWEEN 0 and 30

-- select all trx with a card
SELECT
    *
FROM trx.transactions t
    JOIN card.card c on c.account_id = t.source_account_id or c.account_id = t.target_account_id

-- each loan repayment amount
SELECT
    l.loan_id ,
    amount*((interest_rate/100) + 1) / loan_term_months as repayment_amount
FROM loan.loan l
WHERE l.repayment_status = 'active'

-- all the cheque from each account
SELECT
    a.*,
    cp.*
FROM account.account a
    JOIN cheque.checkbook c on c.account_id = a.account_id
    JOIN cheque.check_paper cp on cp.checkbook_id = c.checkbook_id
    

