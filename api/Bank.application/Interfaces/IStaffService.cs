namespace Bank.application.Interfaces;

using domain.Entities;


public interface IStaffService {

    Task<List<Staff>> GetAllAsync();

    Task<Staff?> GetByIdAsync(int id);

    Task<int> CreateAsync(Staff staff);

    Task<int> UpdateAsync(Staff staff);

    Task<int> DeleteAsync(int id);

}
