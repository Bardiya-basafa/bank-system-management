namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class CurrencyService : ICurrencyService {

    private readonly ICurrencyRepository _currencyRepository;

    public CurrencyService(ICurrencyRepository currencyRepository)
    {
        _currencyRepository = currencyRepository;
    }

    public async Task<List<Currency>> GetAllCurrenciesAsync()
    {
        return await _currencyRepository.GetAllCurrenciesAsync();
    }

    public async Task<Currency?> GetCurrencyByIdAsync(int id)
    {
        return await _currencyRepository.GetCurrencyByIdAsync(id);
    }

    public async Task<int> CreateCurrencyAsync(Currency currency)
    {
        return await _currencyRepository.CreateCurrencyAsync(currency);
    }

    public async Task<int> UpdateCurrencyAsync(Currency currency)
    {
        return await _currencyRepository.UpdateCurrencyAsync(currency);
    }

    public async Task<int> DeleteCurrencyAsync(int id)
    {
        return await _currencyRepository.DeleteCurrencyAsync(id);
    }

}
