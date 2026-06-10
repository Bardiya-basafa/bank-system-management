namespace Bank.infrastructure;

using domain.RepositoryContracts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


public static class DependencyInjection {
    
    public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ICustomerRepository, ICustomerRepository>();

        return services;
    }

}
