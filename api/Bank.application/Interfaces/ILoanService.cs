namespace Bank.application.Interfaces;

using domain.Entities;


public interface ILoanService {

    Task<List<Loan>> GetAllLoansAsync();

    Task<Loan?> GetLoanByIdAsync(int id);

    Task<int> CreateLoanAsync(Loan loan);

}
