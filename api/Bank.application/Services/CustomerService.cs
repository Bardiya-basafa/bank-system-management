namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class CustomerService : ICustomerService {

    private readonly ICustomerRepository _customerRepository;

    public CustomerService(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<List<Customer>> GetCustomers()
    {
        return await _customerRepository.GetAllAsync();
    }

    public Task<Customer> GetCustomer(int id) => throw new NotImplementedException();

    public Task<Customer> CreateCustomer(Customer customer) => throw new NotImplementedException();

    public Task<Customer> UpdateCustomer(Customer customer) => throw new NotImplementedException();

    public Task<bool> DeleteCustomer(int id) => throw new NotImplementedException();

}
