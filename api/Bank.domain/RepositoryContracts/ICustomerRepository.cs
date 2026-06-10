namespace Bank.domain.RepositoryContracts;

using Entities;


public interface ICustomerRepository {

    Task<List<Customer>> GetAllAsync();

    Task<Customer> GetByIdAsync(int id);

    Task<Customer> CreateAsync(Customer customer);

    Task<Customer> UpdateAsync(Customer customer);

    Task DeleteAsync(int id);

}
