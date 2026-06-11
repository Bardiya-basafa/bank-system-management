namespace Bank.domain.RepositoryContracts;

using Entities;


public interface IAccountRepository {

    Task<List<Account>> GetAllAsync();

    Task<Account?> GetByIdAsync(int id);

    Task<int> CreateAsync(Account account);

    Task<int> UpdateAsync(Account account);

    Task<int> DeleteAsync(int id);

}
