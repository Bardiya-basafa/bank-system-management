namespace Bank.infrastructure.Repositories;

using Dapper;
using DbContext;
using domain.Entities;
using domain.RepositoryContracts;


public class BranchRepository : IBranchRepository {

    private readonly DbContext _context;

    public BranchRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<Branch>> GetAllAsync()
    {
        using var db = _context.GetConnection();

        var sql = @"
            SELECT *
            FROM branch.branch";

        var result = await db.QueryAsync<Branch>(sql);

        return result.ToList();
    }

    public async Task<Branch?> GetByIdAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"
            SELECT *
            FROM branch.branch
            WHERE branch_id = @Id";

        var branch = await db.QueryFirstOrDefaultAsync<Branch>(
        sql,
        new { Id = id }
        );

        return branch;
    }

    public async Task<int> CreateAsync(Branch branch)
    {
        using var db = _context.GetConnection();

        var sql = @"
            INSERT INTO branch.branch
            (
                branch_code,
                branch_name,
                city,
                address,
                status
            )
            VALUES
            (
                @BranchCode,
                @BranchName,
                @City,
                @Address,
                @Status
            );

            SELECT CAST(SCOPE_IDENTITY() AS INT);";

        var newId = await db.ExecuteScalarAsync<int>(sql, branch);

        return newId;
    }

    public async Task<int> UpdateAsync(Branch branch)
    {
        using var db = _context.GetConnection();

        var sql = @"
            UPDATE branch.branch
            SET
                branch_code = @BranchCode,
                branch_name = @BranchName,
                city = @City,
                address = @Address,
                phone = @Phone,
                status = @Status
            WHERE branch_id = @BranchId";

        var affectedRows = await db.ExecuteAsync(sql, branch);

        return affectedRows;
    }

    public async Task<int> DeleteAsync(int id)
    {
        using var db = _context.GetConnection();

        var sql = @"
            DELETE FROM branch.branch
            WHERE branch_id = @Id";

        var affectedRows = await db.ExecuteAsync(sql, new { Id = id });

        return affectedRows;
    }

}
