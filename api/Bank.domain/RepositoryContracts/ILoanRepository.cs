namespace Bank.domain.RepositoryContracts;

using Entities;


public interface ILoanRepository {

    Task<List<Loan>> GetAllLoansAsync();

    Task<Loan?> GetLoanByIdAsync(int id);

    Task<int> CreateLoanAsync(Loan loan);

}
