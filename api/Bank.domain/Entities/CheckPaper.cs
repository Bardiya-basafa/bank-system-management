namespace Bank.domain.Entities;

public class CheckPaper
{
    public int CheckId { get; set; }
    public string CheckNumber { get; set; }
    public int CheckbookId { get; set; }
    public int ReceiverAccountId { get; set; }
    public decimal Amount { get; set; }
    public DateTime IssuedAt { get; set; }
    public DateTime ExpireDate { get; set; }
    public DateTime? ClearedDate { get; set; }
    public string Status { get; set; }
}
