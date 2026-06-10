namespace Bank.domain.Entities;

public class Checkbook
{
    public int CheckbookId { get; set; }
    public int AccountId { get; set; }
    public int BranchId { get; set; }
    public DateTime IssueDate { get; set; }
    public int NumberOfChecks { get; set; }
    public string Status { get; set; }
}

