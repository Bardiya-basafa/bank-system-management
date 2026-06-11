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

    public async Task<Customer> GetByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"SELECT * 
                    FROM customer.customer
                    WHERE customer_id = @Id";

        var customer = await db.QueryFirstAsync<Customer>(sql, new { Id = id });

        return customer;
    }

    public async Task<int> CreateAsync(Customer customer)
    {
        using var db = _context.GetConnection();

        var sql = @"
        INSERT INTO customer.customer
        (customer_type, phone, email, password_hash, status)
        VALUES
        (@CustomerType, @Phone, @Email, @PasswordHash, @Status)";

        return await db.ExecuteAsync(sql, customer);
    }

    public async Task<int> UpdateAsync(Customer customer)
    {
        using var db = _context.GetConnection();

        var sql = @"
        UPDATE customer.customer
        SET
            customer_type = @CustomerType,
            phone = @Phone,
            email = @Email,
            password_hash = @PasswordHash,
            status = @Status,
            updated_at = SYSDATETIME()
        WHERE customer_id = @CustomerId";

        return await db.ExecuteAsync(sql, customer);
    }

    public async Task<int> DeleteAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"DELETE FROM customer.customer 
                    WHERE customer_id = @Id";

        return await db.ExecuteAsync(sql, new { Id = id });
    }

    public async Task<List<Account>> GetAllAccountsAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"SELECT * from account.account where customer_id = @Id";
        var result = await db.QueryAsync<Account>(sql, new { Id = id });

        return result.ToList();
    }

}
