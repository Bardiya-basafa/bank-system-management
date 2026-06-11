namespace Bank.domain.RepositoryContracts;

using Entities;


public interface ICustomerRepository {

    Task<List<Customer>> GetAllAsync();

    Task<Customer> GetByIdAsync(int id);

    Task<int> CreateAsync(Customer customer);

    Task<int> UpdateAsync(Customer customer);

    Task<int> DeleteAsync(int id);
    
    Task<List<Account>> GetAllAccountsAsync(int id);
}
