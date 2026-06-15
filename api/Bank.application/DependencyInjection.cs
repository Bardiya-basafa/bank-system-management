namespace Bank.application;

using Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Services;


public static class DependencyInjection {

    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ICustomerService, CustomerService>();
        services.AddScoped<IAccountService, AccountService>();
        services.AddScoped<IStaffService, StaffService>();
        services.AddScoped<IBranchService, BranchService>();
        services.AddScoped<ICurrencyService, CurrencyService>();
        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<ILoanService, LoanService>();

        return services;
    }

}
