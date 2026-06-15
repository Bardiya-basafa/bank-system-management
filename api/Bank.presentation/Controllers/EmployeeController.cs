using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Bank.presentation.Controllers;

[Route("api/employee")]
[ApiController]
[Authorize(Roles = "employee,manager,admin")] 
public class EmployeeController : ControllerBase
{
    private readonly string _connectionString;

    public EmployeeController(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string not found.");
    }

    [HttpGet("dashboard-stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        using var connection = new SqlConnection(_connectionString);

        var customersTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM customer.customer");
        var accountsTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM account.account");

        await Task.WhenAll(customersTask, accountsTask);

        return Ok(new 
        {
            TotalCustomers = await customersTask,
            ActiveAccounts = await accountsTask,
            PendingTasks = 0
        });
    }
}