namespace Bank.application.Interfaces;

using domain.Entities;


public interface ITransactionService {

    Task<List<Transaction>> GetAllTransactionsAsync();

    Task<Transaction?> GetTransactionByIdAsync(int id);

    Task<int> CreateTransactionAsync(Transaction transaction);

}
