namespace Bank.domain.RepositoryContracts;

using Entities;


public interface IBranchRepository {

    Task<List<Branch>> GetAllAsync();

    Task<Branch?> GetByIdAsync(int id);

    Task<int> CreateAsync(Branch branch);

    Task<int> UpdateAsync(Branch branch);

    Task<int> DeleteAsync(int id);

}
