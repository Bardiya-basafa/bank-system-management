namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class LoanService : ILoanService {

    private readonly ILoanRepository _loanRepository;

    public LoanService(ILoanRepository loanRepository)
    {
        _loanRepository = loanRepository;
    }

    public async Task<List<Loan>> GetAllLoansAsync()
    {
        return await _loanRepository.GetAllLoansAsync();
    }

    public async Task<Loan?> GetLoanByIdAsync(int id)
    {
        return await _loanRepository.GetLoanByIdAsync(id);
    }

    public async Task<int> CreateLoanAsync(Loan loan)
    {
        return await _loanRepository.CreateLoanAsync(loan);
    }

}
