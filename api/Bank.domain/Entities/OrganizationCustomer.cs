namespace Bank.domain.Entities;

public class OrganizationCustomer
{
    public int CustomerId { get; set; }
    public string OrganizationName { get; set; }
    public byte[] RegistrationNumber { get; set; }
    public DateTime? FoundedDate { get; set; }
    public string Industry { get; set; }
    public string HeadquartersAddress { get; set; }
    public int? ContactPersonId { get; set; }
    public byte[] CeoSsn { get; set; }
}
