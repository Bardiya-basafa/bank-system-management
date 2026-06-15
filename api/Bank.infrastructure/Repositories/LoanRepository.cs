namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class LoanRepository : ILoanRepository {

    private readonly DbContext _context;

    public LoanRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Loan>> GetAllLoansAsync()
    {
        using var db = _context.GetConnection();

        var sql = @"select * from loan.loan";

        var loans = await db.QueryAsync<Loan>(sql);

        return loans.ToList();
    }

    public async Task<Loan?> GetLoanByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"select * from loan.loan where loan_id = @Id";
        var loan = await db.QueryFirstOrDefaultAsync<Loan>(sql, new { Id = id });

        return loan;
    }

    public async Task<int> CreateLoanAsync(Loan loan)
    {
        using var db = _context.GetConnection();

        var sql = @"
            INSERT into loan.loan
                    (
                    account_id,guarantor_customer_id,amount,interest_rate,loan_term_months,repayment_status
                    )
             VALUES
                    (
                    @AccountId,
                    @GuarantorCustomerId,
                    @Amount,
                    @InterestRate,
                    @LoanTermMonths,
                    @RepaymentStatus
                    )

                SELECT CAST(SCOPE_IDENTITY() AS INT);";

        var newId = await db.ExecuteScalarAsync<int>(sql, loan);

        return newId;
    }

}
