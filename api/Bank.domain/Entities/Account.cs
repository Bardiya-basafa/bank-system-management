namespace Bank.domain.Entities;
public class Account
{
    public int AccountId { get; set; }
    public string AccountNumber { get; set; }
    public int CurrencyId { get; set; }
    public string AccountType { get; set; }
    public decimal Balance { get; set; }
    public string AccountStatus { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
}
