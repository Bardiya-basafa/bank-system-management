namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class StaffRepository : IStaffRepository {

    private readonly DbContext _context;

    public StaffRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Staff>> GetAllAsync()
    {
        using var db = _context.GetConnection();

        var sql = @"SELECT * FROM staff.staff";

        var result = await db.QueryAsync<Staff>(sql);

        return result.ToList();
    }

    public async Task<Staff?> GetByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"
            SELECT * 
            FROM staff.staff
            WHERE staff_id = @Id";

        return await db.QueryFirstOrDefaultAsync<Staff>(sql, new { Id = id });
    }

    public async Task<int> CreateAsync(Staff staff)
    {
        using var db = _context.GetConnection();

        var sql = @"
            INSERT INTO staff.staff
            (
                branch_id,
                first_name,
                last_name,
                national_code,
                phone,
                email,
                job_title,
                hire_date,
                status
            )
            VALUES
            (
                @BranchId,
                @FirstName,
                @LastName,
                @NationalCode,
                @Phone,
                @Email,
                @JobTitle,
                @HireDate,
                @Status
            )";

        return await db.ExecuteAsync(sql, staff);
    }

    public async Task<int> UpdateAsync(Staff staff)
    {
        using var db = _context.GetConnection();

        var sql = @"
            UPDATE staff.staff
            SET
                branch_id = @BranchId,
                first_name = @FirstName,
                last_name = @LastName,
                national_code = @NationalCode,
                phone = @Phone,
                email = @Email,
                job_title = @JobTitle,
                hire_date = @HireDate,
                status = @Status
            WHERE staff_id = @StaffId";

        return await db.ExecuteAsync(sql, staff);
    }

    public async Task<int> DeleteAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"
            DELETE FROM staff.staff
            WHERE staff_id = @Id";

        return await db.ExecuteAsync(sql, new { Id = id });
    }

}
