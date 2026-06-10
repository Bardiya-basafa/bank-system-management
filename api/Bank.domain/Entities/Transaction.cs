namespace Bank.domain.Entities;

public class Transaction
{
    public long TransactionId { get; set; }
    public string ReferenceCode { get; set; }
    public int? SourceAccountId { get; set; }
    public int? TargetAccountId { get; set; }
    public int? SourceDeviceId { get; set; }
    public string TransactionType { get; set; }
    public decimal Amount { get; set; }
    public string TransactionStatus { get; set; }
    public string Description { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}
