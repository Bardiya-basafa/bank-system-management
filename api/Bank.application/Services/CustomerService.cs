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

    public async Task<Customer> GetCustomer(int id)
    {
        return await _customerRepository.GetByIdAsync(id);
    }

    public async Task<int> CreateCustomer(Customer customer)
    {
        return await _customerRepository.CreateAsync(customer);
    }

    public async Task<int> UpdateCustomer(Customer customer)
    {
        return await _customerRepository.UpdateAsync(customer);
    }

    public async Task<int> DeleteCustomer(int id)
    {
        return await _customerRepository.DeleteAsync(id);
    }

    public async Task<List<Account>> GetAccounts(int id)
    {
        return await _customerRepository.GetAllAccountsAsync(id);
    }

}
