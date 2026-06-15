namespace Bank.presentation.Controllers;

using application.Interfaces;
using domain.RepositoryContracts;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;


[Route("api/auth")]
public class AuthController : ControllerBase {

    private readonly IAuthRepository _authRepository;

    private readonly IJwtService _jwtService;

    public AuthController(IAuthRepository authRepository, IJwtService jwtService)
    {
        _authRepository = authRepository;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var roles = await _authRepository.Login(loginRequest.Email, loginRequest.Password);

        if (roles.Count == 0){
            return Unauthorized();
        }

        var token = _jwtService.GenerateToken(loginRequest.Email, roles);

        return Ok(new { token });
    }

}
