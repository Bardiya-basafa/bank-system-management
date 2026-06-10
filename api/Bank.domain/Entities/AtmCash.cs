namespace Bank.domain.Entities;

public class AtmCash
{
    public int AtmId { get; set; }
    public int CurrencyId { get; set; }
    public decimal Amount { get; set; }
}
