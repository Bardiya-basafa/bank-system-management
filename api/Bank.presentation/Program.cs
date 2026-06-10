using Bank.application;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.AddApplication();

var app = builder.Build();

app.MapControllers();

app.Run();
