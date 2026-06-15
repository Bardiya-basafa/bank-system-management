namespace Bank.application.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;


public class JwtService : IJwtService {

    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateToken(string email, IEnumerable<string> roles)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.NameIdentifier, email),
            new Claim(ClaimTypes.Name, email),
        };

        foreach (var roleClaim in roles){
            claims.Add(new Claim(ClaimTypes.Role, roleClaim));
        }

        var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(_configuration["JWT:Key"] ?? "this_is_a_very_secure_jwt_secret_key_12345"));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
        issuer: _configuration["JWT:Issuer"] ?? "localhost",
        audience: _configuration["JWT:Audience"] ?? "localhost",
        claims: claims,
        expires: DateTime.Now.AddHours(24),
        signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}
