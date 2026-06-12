namespace Bank.infrastructure;

using domain.RepositoryContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Repositories;


public static class DependencyInjection {

    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<IStaffRepository, StaffRepository>();
        services.AddScoped<IBranchRepository, BranchRepository>();

        services.AddSingleton(
        new DbContext.DbContext(
        configuration.GetConnectionString("DefaultConnection")));

        return services;
    }

}
