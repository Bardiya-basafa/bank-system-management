namespace Bank.application.Services;

using domain.Entities;
using domain.RepositoryContracts;
using Interfaces;


public class StaffService : IStaffService {

    private readonly IStaffRepository _staffRepository;

    public StaffService(IStaffRepository staffRepository)
    {
        _staffRepository = staffRepository;
    }

    public async Task<List<Staff>> GetAllAsync()
    {
        return await _staffRepository.GetAllAsync();
    }

    public async Task<Staff?> GetByIdAsync(int id)
    {
        return await _staffRepository.GetByIdAsync(id);
    }

    public async Task<int> CreateAsync(Staff staff)
    {
        return await _staffRepository.CreateAsync(staff);
    }

    public async Task<int> UpdateAsync(Staff staff)
    {
        return await _staffRepository.UpdateAsync(staff);
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await _staffRepository.DeleteAsync(id);
    }

    public async Task<int> SetBranchId(int staffId, int branchId)
    {
        return await _staffRepository.SetBranchId(staffId, branchId);
    }

}
