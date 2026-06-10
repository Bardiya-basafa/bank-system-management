namespace Bank.domain.Entities;

public class AccountOwner
{
    public int AccountId { get; set; }
    public int CustomerId { get; set; }
    public string OwnershipType { get; set; }
    public DateTime AssignedAt { get; set; }
    public string Status { get; set; }
}
