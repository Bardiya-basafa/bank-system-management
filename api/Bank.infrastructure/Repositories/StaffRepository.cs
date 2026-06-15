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

        var result = await db.QueryFirstOrDefaultAsync<Staff>(sql, new { Id = id });

        return result;
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
                ssn,
                phone,
                email,
                hire_date,
                status,
                password_hash,
                role,
                address
            )
            VALUES
            (
                @BranchId,
                @FirstName,
                @LastName,
                @Ssn,
                @Phone,
                @Email,
                @HireDate,
                @Status,
                @PasswordHash,
                @Role,
                @Address
            )
            SELECT CAST(SCOPE_IDENTITY() AS INT);
            ";

        var newId = await db.ExecuteScalarAsync<int>(sql, staff);

        return newId;
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
                phone = @Phone,
                email = @Email,
                role = @Role,
                termination_date = @TerminationDate,
                hire_date = @HireDate,
                status = @Status,
                address = @Address,
                updated_at = SYSDATETIME()
            WHERE staff_id = @StaffId";

        var affectedRows = await db.ExecuteAsync(sql, staff);

        return affectedRows;
    }

    public async Task<int> DeleteAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"
            DELETE FROM staff.staff
            WHERE staff_id = @Id";

        var affectedRows = await db.ExecuteAsync(sql, new { Id = id });

        return affectedRows;
    }

    public async Task<int> SetBranchId(int staffId, int branchId)
    {
        using var db = _context.GetConnection();
        var staff = await GetByIdAsync(staffId);

        if (staff?.Role != "manager"){
            return 0;
        }

        var sql = @"update staff.staff set branch_id = @BranchId where staff_id = @StaffId";
        var affectedRows = await db.ExecuteAsync(sql, new { BranchId = branchId, StaffId = staffId });

        return affectedRows;
    }

}
