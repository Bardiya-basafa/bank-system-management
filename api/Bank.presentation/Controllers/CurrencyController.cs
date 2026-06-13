namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;
using Microsoft.AspNetCore.Mvc;


[Route("api/currency/")]
public class CurrencyController : ControllerBase {

    private readonly ICurrencyService _currencyService;

    public CurrencyController(ICurrencyService currencyService)
    {
        _currencyService = currencyService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCurrencies()
    {
        var result = await _currencyService.GetAllCurrenciesAsync();

        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCurrencyById(int id)
    {
        var result = await _currencyService.GetCurrencyByIdAsync(id);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> AddCurrency([FromBody] Currency currency)
    {
        var newId = await _currencyService.CreateCurrencyAsync(currency);

        return Ok(newId);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCurrency([FromBody] Currency currency)
    {
        var affectedRows = await _currencyService.UpdateCurrencyAsync(currency);

        return Ok(affectedRows);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCurrency(int id)
    {
        var affectedRows = await _currencyService.DeleteCurrencyAsync(id);

        return Ok(affectedRows);
    }

}
