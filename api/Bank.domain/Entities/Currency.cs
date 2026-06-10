namespace Bank.domain.Entities;

public class Currency {

    public int CurrencyId { get; set; }

    public string CurrencyCode { get; set; }

    public string CurrencyName { get; set; }

    public string CurrencySymbol { get; set; }

    public bool IsForeign { get; set; }

}
