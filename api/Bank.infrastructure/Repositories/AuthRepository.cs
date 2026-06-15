namespace Bank.infrastructure.Repositories;

using System.Text;
using Dapper;
using DbContext;
using domain.RepositoryContracts;


public class AuthRepository : IAuthRepository {

    private readonly DbContext _context;

    public AuthRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<List<string>> Login(string username, string password)
    {
        byte[] passwordByte = Encoding.UTF8.GetBytes(password);

        using var db = _context.GetConnection();
        var sql = @"select 1 from customer.customer where email = @username and password_hash = HASHBYTES('SHA2_256' , @passwordByte);";

        var result = await db.QueryFirstOrDefaultAsync<int>(sql, new { username, passwordByte });
        var roles = new List<string>();

        if (result == 1){
            roles.Add("customer");
        }

        var sqlSec = @"select role from staff.staff where email = @username and password_hash = HASHBYTES('SHA2_256' , @passwordByte);";
        var staffRole = await db.QueryFirstOrDefaultAsync<string>(sqlSec, new { username, passwordByte });

        if (!string.IsNullOrEmpty(staffRole)){
            roles.Add(staffRole);
        }

        return roles;
    }

}
