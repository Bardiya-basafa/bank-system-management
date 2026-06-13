namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class CurrencyRepository : ICurrencyRepository {

    private readonly DbContext _context;

    public CurrencyRepository(DbContext context)
    {
        _context = context;
    }


    public async Task<List<Currency>> GetAllCurrenciesAsync()
    {
        using var db = _context.GetConnection();
        var currencies = await db.QueryAsync<Currency>(@"select * from currency.currency");

        return currencies.ToList();
    }

    public async Task<Currency?> GetCurrencyByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        var currency = await db.QueryFirstOrDefaultAsync<Currency>(@"select * from currency.currency where currency_id = @Id", new { Id = id });

        return currency;
    }

    public async Task<int> CreateCurrencyAsync(Currency currency)
    {
        using var db = _context.GetConnection();

        var sql = @"insert into currency.currency (currency_code,currency_name,currency_symbol,is_foreign) values (@CurrencyCode,@CurrencyName,@CurrencySymbol,@IsForeign)
                    SELECT CAST(SCOPE_IDENTITY() AS INT);";

        var newId = await db.ExecuteScalarAsync<int>(sql, currency);

        return newId;
    }

    public async Task<int> UpdateCurrencyAsync(Currency currency)
    {
        using var db = _context.GetConnection();
        var sql = @"update currency.currency set currency_code = @CurrencyCode, currency_name = @CurrencyName, currency_symbol = @CurrencySymbol, is_foreign = @IsForeign where currency_id = @CurrencyId";

        var affectedRows = await db.ExecuteAsync(sql, currency);

        return affectedRows;
    }

    public async Task<int> DeleteCurrencyAsync(int id)
    {
        using var db = _context.GetConnection();
        var sql = @"delete from currency.currency where currency_id = @Id";

        var affectedRows = await db.ExecuteAsync(sql, new { Id = id });

        return affectedRows;
    }

}
