namespace Bank.domain.RepositoryContracts;

public interface IAuthRepository {

    Task<List<string>> Login(string username, string password);

}
