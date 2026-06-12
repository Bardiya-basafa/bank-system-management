using Microsoft.AspNetCore.Mvc;


namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;


[Route("api/account/")]
public class AccountController : ControllerBase {

    private readonly ILogger<CustomerController> _logger;

    private readonly IAccountService _accountService;

    public AccountController(ILogger<CustomerController> logger, IAccountService accountService)
    {
        _logger = logger;
        _accountService = accountService;
    }

    // get accounts
    [HttpGet]
    public async Task<IActionResult> GetAccounts()
    {
        var accounts = await _accountService.GetAllAsync();

        return Ok(accounts);
    }

    // get account by id
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetAccountById(int id)
    {
        var account = await _accountService.GetByIdAsync(id);

        return Ok(account);
    }

    // create new account
    [HttpPost("{id:int}")]
    public async Task<IActionResult> CreateAccount([FromBody] Account request, int id)
    {
        var customer = await _accountService.CreateAsync(request, id);

        // create customer
        return Ok(customer);
    }

    // delete an account
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAccount(int id)
    {
        var result = await _accountService.DeleteAsync(id);

        return Ok(result);
    }

    // update an account
    [HttpPut]
    public async Task<IActionResult> UpdateAccount([FromBody] Account request)
    {
        var result = await _accountService.UpdateAsync(request);

        return Ok(result);
    }

}
