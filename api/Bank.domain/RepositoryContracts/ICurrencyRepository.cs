namespace Bank.domain.RepositoryContracts;

using Entities;


public interface ICurrencyRepository {

    Task<List<Currency>> GetAllCurrenciesAsync();

    Task<Currency?> GetCurrencyByIdAsync(int id);

    Task<int> CreateCurrencyAsync(Currency currency);

    Task<int> UpdateCurrencyAsync(Currency currency);

    Task<int> DeleteCurrencyAsync(int id);

}
