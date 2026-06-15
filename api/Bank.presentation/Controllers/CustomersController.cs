using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Security.Claims;

namespace Bank.presentation.Controllers;

[Route("api/customer")]
[ApiController]
[Authorize(Roles = "customer")] 
public class CustomerController : ControllerBase
{
    private readonly string _connectionString;

    public CustomerController(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection") ?? "";
    }

    [HttpGet("accounts")]
    public async Task<IActionResult> GetMyAccounts()
    {
        var email = User.FindFirst(ClaimTypes.Email)?.Value;
        
        using var connection = new SqlConnection(_connectionString);
        
        var sql = @"
            SELECT a.account_number, a.account_type, a.balance 
            FROM account.account a
            JOIN account.account_owner ao ON a.account_id = ao.account_id
            JOIN customer.customer c ON ao.customer_id = c.customer_id
            WHERE c.email = @Email";

        var accounts = await connection.QueryAsync(sql, new { Email = email });
        return Ok(accounts);
    }
}