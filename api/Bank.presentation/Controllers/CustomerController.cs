using Microsoft.AspNetCore.Mvc;

[Route("api/customer")]
public class CustomerController : ControllerBase
{
    [HttpGet("/")]
    public async Task<IActionResult> GetCustomers()
    {

        // get all customers
        return Ok();
    }
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCustomerById(int id)
    {

        // get customer by id
        return Ok();
    }
    [HttpPost("/")]
    public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomer request)
    {

        // create customer
        return Ok(request);
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCustomer(int id)
    {

        // delte a customer
        return Ok();
    }
}