namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.Entities;
using Microsoft.AspNetCore.Mvc;


[Route("api/branch/")]
public class BranchController : ControllerBase {

    private readonly IBranchService _branchService;

    public BranchController(IBranchService branchService)
    {
        _branchService = branchService;
    }

    [HttpGet]
    public async Task<IActionResult> GetBranches()
    {
        var branches = await _branchService.GetBranchesAsync();

        return Ok(new { branches = branches });
    }

    [HttpPost]
    public async Task<IActionResult> CreateBranch([FromBody] Branch branch)
    {
        try{
            var newId = await _branchService.CreateBranchAsync(branch);

            return Ok(new { Id = newId });
        }
        catch (Exception e){
            return BadRequest("Something went wrong");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBranch(int id)
    {
        try{
            var affectedRows = await _branchService.DeleteBranchAsync(id);

            return Ok(new { affectedRows = affectedRows });
        }
        catch (Exception e){
            return BadRequest("Something went wrong");
        }
    }

}
