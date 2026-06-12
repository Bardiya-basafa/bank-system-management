namespace Bank.presentation.DTO;

public class CreateStaffRequest {

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Ssn { get; set; }// Plain text string: "123"

    public string Email { get; set; }

    public string Phone { get; set; }

    public string Password { get; set; }// Plain text string: "mypassword"

    public string Role { get; set; }

    public string Address { get; set; }

    public DateTime HireDate { get; set; }

    public DateTime? TerminationDate { get; set; }

    public int? BranchId { get; set; }

    public string Status { get; set; }

}
