namespace Bank.domain.Entities;

public class Card
{
    public int CardId { get; set; }
    public string CardNumber { get; set; }
    public int AccountId { get; set; }
    public DateTime ExpireDate { get; set; }
    public byte[] Cvv2 { get; set; }
    public string Status { get; set; }
    public DateTime IssuedAt { get; set; }
}
