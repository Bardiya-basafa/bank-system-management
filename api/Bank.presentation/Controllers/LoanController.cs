namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;
using Microsoft.AspNetCore.Mvc;


[Route("api/loan")]
public class LoanController : ControllerBase {

    private readonly ILoanService _loanService;

    public LoanController(ILoanService loanService)
    {
        _loanService = loanService;
    }

    [HttpGet]
    public async Task<IActionResult> GetLoans()
    {
        var loans = await _loanService.GetAllLoansAsync();

        return Ok(loans);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetLoanById(int id)
    {
        var loan = await _loanService.GetLoanByIdAsync(id);

        return Ok(loan);
    }

    [HttpPost]
    public async Task<IActionResult> CreateLoan([FromBody] Loan loan)
    {
        try{
            var newId = await _loanService.CreateLoanAsync(loan);

            return Ok(new { newId = newId });
        }
        catch (Exception e){
            return BadRequest("Something went wrong.");
        }
    }

}
