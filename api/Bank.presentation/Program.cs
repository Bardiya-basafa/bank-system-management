var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddAuthorization();
builder.Services.addapplic


var app = builder.Build();

app.MapControllers();

app.Run();
