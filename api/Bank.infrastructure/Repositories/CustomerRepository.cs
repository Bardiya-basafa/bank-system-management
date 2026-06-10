namespace Bank.infrastructure.Repositories;

using domain.Entities;
using domain.RepositoryContracts;


public class CustomerRepository : ICustomerRepository {

    public Task<List<Customer>> GetAllAsync() => throw new NotImplementedException();

    public Task<Customer> GetByIdAsync(int id) => throw new NotImplementedException();

    public Task<Customer> CreateAsync(Customer customer) => throw new NotImplementedException();

    public Task<Customer> UpdateAsync(Customer customer) => throw new NotImplementedException();

    public Task DeleteAsync(int id) => throw new NotImplementedException();

}
