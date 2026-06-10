namespace Bank.domain.Entities;

public class Atm
{
    public int AtmId { get; set; }
    public int? BranchId { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }
    public DateTime EstablishDate { get; set; }
}
