using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient; 
using Dapper;

namespace Bank.presentation.Controllers;

[Route("api/admin")]
[ApiController]
[Authorize(Roles = "admin")] 
public class AdminController : ControllerBase
{
    private readonly string _connectionString;

    public AdminController(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Connection string not found.");
    }

    [HttpGet("dashboard-stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        using var connection = new SqlConnection(_connectionString);

        var branchesTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM branch.branch");
        var currenciesTask = connection.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM currency.currency");

        await Task.WhenAll(branchesTask, currenciesTask);

        var stats = new 
        {
            TotalBranches = await branchesTask,
            TotalCurrencies = await currenciesTask
        };

        return Ok(stats);
    }
}