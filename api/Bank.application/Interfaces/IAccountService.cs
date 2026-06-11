namespace Bank.application.Interfaces;

using domain.Entities;


public interface IAccountService {

    Task<List<Account>> GetAllAsync();

    Task<Account?> GetByIdAsync(int id);

    Task<int> CreateAsync(Account account);

    Task<int> UpdateAsync(Account account);

    Task<int> DeleteAsync(int id);

}
