var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddAuthorization();


var app = builder.Build();

app.MapControllers();

app.Run();
