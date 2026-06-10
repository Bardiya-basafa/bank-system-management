namespace Bank.application;

using Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Services;


public static class DependencyInjection {

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICustomerService, CustomerService>();
        return services;
    }

}
