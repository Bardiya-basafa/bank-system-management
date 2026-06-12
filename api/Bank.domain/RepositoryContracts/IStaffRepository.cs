namespace Bank.domain.RepositoryContracts;

using Entities;


public interface IStaffRepository {

    Task<List<Staff>> GetAllAsync();

    Task<Staff?> GetByIdAsync(int id);

    Task<int> CreateAsync(Staff staff);

    Task<int> UpdateAsync(Staff staff);

    Task<int> DeleteAsync(int id);

}
