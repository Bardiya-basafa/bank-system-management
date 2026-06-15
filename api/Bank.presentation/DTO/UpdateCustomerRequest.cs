namespace Bank.presentation.DTO;

public class UpdateCustomerRequest {

    public int CustomerId { get; set; }

    public string CustomerType { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string Status { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

}
