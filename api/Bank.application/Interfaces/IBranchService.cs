namespace Bank.application.Interfaces;

using domain.Entities;


public interface IBranchService {

    Task<List<Branch>> GetBranchesAsync();

    Task<Branch?> GetBranchByIdAsync(int id);

    Task<int> CreateBranchAsync(Branch branch);

    Task<int> UpdateBranchAsync(Branch branch);

    Task<int> DeleteBranchAsync(int id);

}
