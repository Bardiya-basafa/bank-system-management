USE BankSystemV1
GO

DELETE from currency.currency
GO

DELETE from customer.customer
GO
DELETE from customer.individual_customer
GO
DELETE from customer.organization_customer
GO

DELETE from account.account
GO
DELETE from account.account_owner
GO

DELETE from atm.atm
GO

DELETE from atm.atm_cash
GO

DELETE from branch.branch
GO

DELETE from card.card
GO

DELETE from cheque.check_paper
GO

DELETE from cheque.checkbook
GO

DELETE from device.device
GO

DELETE from ledger.account_balance_history
GO

DELETE from ledger.transaction_status_history
GO

DELETE from loan.loan
GO

DELETE from [message].[message]
GO
DELETE from staff.staff
GO

DELETE from trx.transactions
GO