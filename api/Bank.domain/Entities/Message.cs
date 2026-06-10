namespace Bank.domain.Entities;

public class Message
{
    public int MessageId { get; set; }
    public int CustomerId { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public string MessageStatus { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReadAt { get; set; }
}
