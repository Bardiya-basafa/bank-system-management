namespace Bank.application.Interfaces;

using domain.Entities;


public interface ICustomerService {

    Task<List<Customer>> GetCustomers();

    Task<Customer> GetCustomer(int id);

    Task<Customer> CreateCustomer(Customer customer);

    Task<Customer> UpdateCustomer(Customer customer);

    Task<bool> DeleteCustomer(int id);

}
