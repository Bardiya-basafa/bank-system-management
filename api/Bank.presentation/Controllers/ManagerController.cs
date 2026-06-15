using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Bank.presentation.Controllers;

[Route("api/manager")]
[ApiController]
[Authorize(Roles = "manager,admin")] 
public class ManagerController : ControllerBase
{
    private readonly string _connectionString;

    public ManagerController(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string not found.");
    }

    [HttpGet("dashboard-stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        using var connection = new SqlConnection(_connectionString);

        var staffTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM staff.staff");
        var customerTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM customer.customer");
        var accountTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM account.account");

        await Task.WhenAll(staffTask, customerTask, accountTask);

        var stats = new 
        {
            TotalStaff = await staffTask,
            TotalCustomers = await customerTask,
            TotalAccounts = await accountTask,
            PendingRequests = 0 
        };

        return Ok(stats);
    }

    [HttpGet("staff")]
    public async Task<IActionResult> GetStaffList()
    {
        using var connection = new SqlConnection(_connectionString);

        var sql = @"
            SELECT 
                staff_id AS StaffId, 
                first_name AS FirstName, 
                last_name AS LastName, 
                email AS Email, 
                phone AS Phone, 
                role AS Role, 
                status AS Status,
                branch_id AS BranchId
            FROM staff.staff
            ORDER BY last_name, first_name";

        var staffList = await connection.QueryAsync(sql);

        return Ok(staffList);
    }
}