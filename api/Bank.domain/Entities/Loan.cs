namespace Bank.domain.Entities;

public class Loan
{
    public int LoanId { get; set; }
    public int AccountId { get; set; }
    public int GuarantorCustomerId { get; set; }
    public decimal Amount { get; set; }
    public decimal InterestRate { get; set; }
    public int LoanTermMonths { get; set; }
    public string RepaymentStatus { get; set; }
    public DateTime IssueDate { get; set; }
}
