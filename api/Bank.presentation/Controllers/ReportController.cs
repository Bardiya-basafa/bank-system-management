namespace Bank.presentation.Controllers;

using domain.RepositoryContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Authorize]
[Route("api/report")]
public class ReportController : ControllerBase {

    private readonly IReportRepository _reportRepository;

    public ReportController(IReportRepository reportRepository)
    {
        _reportRepository = reportRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetReport()
    {
        var report = await _reportRepository.GetReportAsync();

        return Ok(report);
    }

}
