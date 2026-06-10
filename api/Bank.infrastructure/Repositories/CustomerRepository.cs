namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class CustomerRepository : ICustomerRepository {

    private readonly DbContext _context;

    public CustomerRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Customer>> GetAllAsync()
    {
        using var db = _context.GetConnection();
        var results = await db.QueryAsync<Customer>("SELECT * FROM customer.customer");

        return results.ToList();
    }

    public Task<Customer> GetByIdAsync(int id) => throw new NotImplementedException();

    public Task<Customer> CreateAsync(Customer customer) => throw new NotImplementedException();

    public Task<Customer> UpdateAsync(Customer customer) => throw new NotImplementedException();

    public Task DeleteAsync(int id) => throw new NotImplementedException();

}
