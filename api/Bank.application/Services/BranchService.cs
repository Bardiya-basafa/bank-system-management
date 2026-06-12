namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class BranchService : IBranchService {

    private readonly IBranchRepository _branchRepository;

    public BranchService(IBranchRepository branchRepository)
    {
        _branchRepository = branchRepository;
    }

    public async Task<List<Branch>> GetBranchesAsync()
    {
        return await _branchRepository.GetAllAsync();
    }

    public async Task<Branch?> GetBranchByIdAsync(int id)
    {
        return await _branchRepository.GetByIdAsync(id);
    }

    public async Task<int> CreateBranchAsync(Branch branch)
    {
        return await _branchRepository.CreateAsync(branch);
    }

    public async Task<int> UpdateBranchAsync(Branch branch)
    {
        return await _branchRepository.UpdateAsync(branch);
    }

    public async Task<int> DeleteBranchAsync(int id)
    {
        return await _branchRepository.DeleteAsync(id);
    }

}
