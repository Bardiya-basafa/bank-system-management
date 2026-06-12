namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;
using DTO;
using Microsoft.AspNetCore.Mvc;


[Route("api/staff/")]
public class StaffController : ControllerBase {

    private readonly IStaffService _staffService;

    public StaffController(IStaffService staffService)
    {
        _staffService = staffService;
    }

    [HttpGet]
    public async Task<IActionResult> GetStaff()
    {
        var result = await _staffService.GetAllAsync();

        return Ok(new { staff = result });
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetStaffById(int id)
    {
        var result = await _staffService.GetByIdAsync(id);

        return Ok(new { staff = result });
    }

    [HttpPost]
    public async Task<IActionResult> CreateStaff([FromBody] CreateStaffRequest request)
    {
        var staff = new Staff
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Ssn = System.Text.Encoding.UTF8.GetBytes(request.Ssn),
            Email = request.Email,
            Phone = request.Phone,
            PasswordHash = System.Text.Encoding.UTF8.GetBytes(request.Password),
            Role = request.Role,
            Address = request.Address,
            HireDate = request.HireDate,
            TerminationDate = request.TerminationDate,
            BranchId = request.BranchId,
            Status = request.Status
        };

        var newId = await _staffService.CreateAsync(staff);

        return Ok(new { newId = newId });
    }

    [HttpPut]
    public async Task<IActionResult> UpdateStaff([FromBody] Staff staff)
    {
        var result = await _staffService.UpdateAsync(staff);

        return Ok(new { rowAffected = result });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteStaff(int id)
    {
        var result = await _staffService.DeleteAsync(id);

        return Ok(new { rowAffected = result });
    }

}
