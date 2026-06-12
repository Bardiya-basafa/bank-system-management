namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class AccountService : IAccountService {

    private readonly IAccountRepository _accountRepository;

    public AccountService(IAccountRepository accountRepository)
    {
        _accountRepository = accountRepository;
    }

    public async Task<List<Account>> GetAllAsync()
    {
        return await _accountRepository.GetAllAsync();
    }

    public async Task<Account?> GetByIdAsync(int id)
    {
        return await _accountRepository.GetByIdAsync(id);
    }

    public async Task<int> CreateAsync(Account account,int customerId)
    {
        return await _accountRepository.CreateAsync(account, customerId);
    }

    public async Task<int> UpdateAsync(Account account)
    {
        return await _accountRepository.UpdateAsync(account);
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await _accountRepository.DeleteAsync(id);
    }

}
