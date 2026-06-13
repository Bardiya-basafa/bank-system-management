namespace Bank.application.Interfaces;

using domain.Entities;


public interface ICurrencyService {

    Task<List<Currency>> GetAllCurrenciesAsync();

    Task<Currency?> GetCurrencyByIdAsync(int id);

    Task<int> CreateCurrencyAsync(Currency currency);

    Task<int> UpdateCurrencyAsync(Currency currency);

    Task<int> DeleteCurrencyAsync(int id);

}
