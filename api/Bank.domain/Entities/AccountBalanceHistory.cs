namespace Bank.domain.Entities;

public class AccountBalanceHistory
{
    public long HistoryId { get; set; }
    public int AccountId { get; set; }
    public decimal OldBalance { get; set; }
    public decimal NewBalance { get; set; }
    public DateTime ChangedAt { get; set; }
    public long? ChangedByTransactionId { get; set; }
    public int? ChangedByUserId { get; set; }
}


