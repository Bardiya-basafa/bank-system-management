namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class ReportRepository : IReportRepository {

    private readonly DbContext _context;

    public ReportRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<Report> GetReportAsync()
    {
        using var db = _context.GetConnection();

        var sql = @"
        SELECT
            (SELECT COUNT(*) FROM staff.staff) AS TotalStaff,
            (SELECT COUNT(*) FROM account.account) AS TotalAccounts,
            (SELECT COUNT(*) FROM customer.customer) AS TotalCustomers,

            (
                SELECT COUNT(*)
                FROM staff.staff
                WHERE LOWER(role) = 'manager'
            ) AS TotalManagers,

            (
                SELECT COUNT(*)
                FROM staff.staff
                WHERE LOWER(role) = 'employee'
            ) AS TotalEmployees,

            (
                SELECT COUNT(*)
                FROM staff.staff
                WHERE LOWER(status) = 'active'
            ) AS TotalActiveStaff,

            (
                SELECT COUNT(*)
                FROM staff.staff
                WHERE LOWER(status) = 'inactive'
            ) AS TotalInactiveStaff,

            (
                SELECT COUNT(*)
                FROM account.account
                WHERE LOWER(account_type) = 'saving'
            ) AS TotalSavingAccounts,

            (
                SELECT COUNT(*)
                FROM account.account
                WHERE LOWER(account_type) = 'checking'
            ) AS TotalCheckingAccounts,

            (
                SELECT COUNT(*)
                FROM account.account
                WHERE LOWER(account_type) = 'business'
            ) AS TotalBusinessAccounts,

            (
                SELECT COUNT(*)
                FROM account.account
                WHERE LOWER(account_status) IN ('frozen', 'suspended')
            ) AS TotalFrozenSuspendedAccounts;
    ";

        var report = await db.QuerySingleAsync<Report>(sql);

        return report;
    }

}
