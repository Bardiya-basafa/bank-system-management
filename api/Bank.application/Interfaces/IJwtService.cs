namespace Bank.application.Interfaces;

public interface IJwtService {

    string GenerateToken(string email, IEnumerable<string> roles);

}
