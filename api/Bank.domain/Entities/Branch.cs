namespace Bank.domain.Entities;

public class Branch
{
    public int BranchId { get; set; }
    public string BranchCode { get; set; }
    public string BranchName { get; set; }
    public string City { get; set; }
    public string Address { get; set; }
    public DateTime EstablishDate { get; set; }
    public string Status { get; set; }
}
