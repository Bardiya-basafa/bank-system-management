namespace Bank.domain.Entities;

public class TransactionStatusHistory {

    public long HistoryId { get; set; }

    public long TransactionId { get; set; }

    public string OldStatus { get; set; }

    public string NewStatus { get; set; }

    public DateTime ChangedAt { get; set; }

    public int? ChangedByUserId { get; set; }

    public string Note { get; set; }

}
