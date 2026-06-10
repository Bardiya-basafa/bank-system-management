namespace Bank.infrastructure.DbContext;

using System.Data.SqlClient;
using System.Data;
using Microsoft.Data.SqlClient;


public class DbContext {

    private readonly string _connectionString;

    public DbContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    public IDbConnection GetConnection()
    {
        return new SqlConnection();
    }

}
