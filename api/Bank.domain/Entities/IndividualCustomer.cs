namespace Bank.domain.Entities;

public class IndividualCustomer {

    public int CustomerId { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public DateTime BirthDate { get; set; }

    public byte[] Ssn { get; set; }

    public string Occupation { get; set; }

    public string Address { get; set; }

}
