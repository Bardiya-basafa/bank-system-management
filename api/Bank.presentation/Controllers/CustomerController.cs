using Microsoft.AspNetCore.Mvc;


namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;


[Route("api/customer")]
public class CustomerController : ControllerBase {

    private readonly ILogger<CustomerController> _logger;

    private readonly ICustomerService _customerService;

    public CustomerController(ILogger<CustomerController> logger, ICustomerService customerService)
    {
        _logger = logger;
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCustomers()
    {
        var customers = await _customerService.GetCustomers();

        return Ok(customers);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCustomerById(int id)
    {
        var customer = await _customerService.GetCustomer(id);

        return Ok(customer);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCustomer([FromBody] Customer request)
    {
        var customer = await _customerService.CreateCustomer(request);

        // create customer
        return Ok(customer);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {
        var result = await _customerService.DeleteCustomer(id);

        return Ok(result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCustomer(int id, [FromBody] Customer request)
    {
        var customer = await _customerService.UpdateCustomer(request);

        return Ok(customer);
    }

}
