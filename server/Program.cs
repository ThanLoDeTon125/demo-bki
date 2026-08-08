using RealtimePlantScan.Server.Hubs;
using RealtimePlantScan.Server.Services;

var builder = WebApplication.CreateBuilder(args);

const string ReactClientCorsPolicy = "AllowReactClient";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddSingleton<ScanStore>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(ReactClientCorsPolicy, policy =>
    {
        policy
            // Demo/LAN: chấp nhận mọi origin (localhost hoặc IP LAN của điện thoại/máy khác).
            // KHÔNG dùng SetIsOriginAllowed(_ => true) trên production, hãy whitelist domain cụ thể.
            .SetIsOriginAllowed(_ => true)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // bắt buộc để SignalR hoạt động cùng CORS
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(); // phục vụ ảnh đã upload trong wwwroot/uploads
app.UseCors(ReactClientCorsPolicy);
app.UseAuthorization();

app.MapControllers();
app.MapHub<ScanHub>("/hubs/scan");

app.Run();
