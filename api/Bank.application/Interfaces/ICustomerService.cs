namespace Bank.application.Interfaces;

using domain.Entities;


public interface ICustomerService {

    Task<List<Customer>> GetCustomers();

    Task<Customer> GetCustomer(int id);

    Task<int> CreateCustomer(Customer customer);

    Task<int> UpdateCustomer(Customer customer);

    Task<int> DeleteCustomer(int id);
    
    Task<List<Account>> GetAccounts(int id);

}
