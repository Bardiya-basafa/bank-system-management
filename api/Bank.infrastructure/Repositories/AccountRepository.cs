namespace Bank.infrastructure.Repositories;

using System.Data;
using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class AccountRepository : IAccountRepository {

    private readonly DbContext _context;

    public AccountRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Account>> GetAllAsync()
    {
        using var db = _context.GetConnection();

        var result = await db.QueryAsync<Account>(
        "SELECT * FROM account.account");

        return result.ToList();
    }

    public async Task<Account?> GetByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        return await db.QueryFirstOrDefaultAsync<Account>(
        "SELECT * FROM account.account WHERE account_id = @Id",
        new { Id = id });
    }

    public async Task<int> CreateAsync(Account account, int customerId)
    {
        using var db = _context.GetConnection();

        // var sql = @"
        // INSERT INTO account.account
        // (account_number, currency_id, account_type, balance, account_status)
        // VALUES
        // (@AccountNumber, @CurrencyId, @AccountType, @Balance, @AccountStatus)";

        var parameters = new
        {
            CustId = customerId,
            AccNumber = account.AccountNumber,
            CurrencyId = account.CurrencyId,
            AccType = account.AccountType,
            Balance = account.Balance,
            AccStatus = account.AccountStatus
        };

        var result = await db.ExecuteAsync(
        "usp_CreatAcc",
        parameters,
        commandType: CommandType.StoredProcedure
        );

        return result;
    }

    public async Task<int> UpdateAsync(Account account)
    {
        using var db = _context.GetConnection();

        var sql = @"
        UPDATE account.account
        SET
            account_number = @AccountNumber,
            currency_id = @CurrencyId,
            account_type = @AccountType,
            balance = @Balance,
            account_status = @AccountStatus
        WHERE account_id = @AccountId";

        return await db.ExecuteAsync(sql, account);
    }

    public async Task<int> DeleteAsync(int id)
    {
        using var db = _context.GetConnection();

        return await db.ExecuteAsync(
        "DELETE FROM account.account WHERE account_id = @Id",
        new { Id = id });
    }

}
