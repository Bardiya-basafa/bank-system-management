namespace Bank.domain.RepositoryContracts;

using Entities;


public interface ITransactionRepository {

    Task<List<Transaction>> GetAllTransactionsAsync();

    Task<Transaction?> GetTransactionByIdAsync(int id);

    Task<int> CreateTransactionAsync(Transaction transaction);

}
