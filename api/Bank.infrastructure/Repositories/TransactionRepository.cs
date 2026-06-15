namespace Bank.infrastructure.Repositories;

using System.Data;
using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class TransactionRepository : ITransactionRepository {

    private readonly DbContext _context;

    public TransactionRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Transaction>> GetAllTransactionsAsync()
    {
        using var db = _context.GetConnection();

        var sql = @"select * from trx.transactions";

        var transactions = await db.QueryAsync<Transaction>(sql);

        return transactions.ToList();
    }

    public async Task<Transaction?> GetTransactionByIdAsync(int id)
    {
        using var db = _context.GetConnection();
        var sql = @"select * from trx.transactions where transaction_id = @Id";
        var transaction = await db.QuerySingleOrDefaultAsync<Transaction>(sql, new { Id = id });

        return transaction;
    }

    public async Task<int> CreateTransactionAsync(Transaction transaction)
    {
        using var db = _context.GetConnection();

        var parameters = new
        {
            RefCod = transaction.ReferenceCode,
            SAccId = transaction.SourceAccountId,
            TAccId = transaction.TargetAccountId,
            SDvcId = transaction.SourceDeviceId,
            TrxType = transaction.TransactionType,
            Amount = transaction.Amount,
            Desc = transaction.Description
        };

        var result = await db.ExecuteAsync(
        "usp_CreateTrx",
        parameters,
        commandType: CommandType.StoredProcedure);

        return result;
    }

}
