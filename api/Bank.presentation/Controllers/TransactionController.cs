namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/transaction")]
[Authorize]
public class TransactionController : ControllerBase {

    private readonly ITransactionService _transactionService;

    public TransactionController(ITransactionService transactionService)
    {
        _transactionService = transactionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _transactionService.GetAllTransactionsAsync();

        return Ok(transactions);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetTransactionById(int id)
    {
        var transaction = await _transactionService.GetTransactionByIdAsync(id);

        return Ok(transaction);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTransaction([FromBody] Transaction transaction)
    {
        try{
            var result = await _transactionService.CreateTransactionAsync(transaction);

            return Ok(result);
        }
        catch (Exception e){
            return BadRequest("Something went wrong");
        }
    }

}
