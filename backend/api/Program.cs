using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAngularDev", policy =>
  {
    policy.WithOrigins("http://localhost:4200")
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials();
  });
});

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.SwaggerDoc("v1", new OpenApiInfo
  {
    Version = "v1",
    Title = "Fastasys API",
    Description = "API for Fastaval event management system",
    Contact = new OpenApiContact
    {
      Name = "Fastaval IT",
      Url = new Uri("https://fastasys.fastaval.dk")
    }
  });

  // Enable annotations
  options.EnableAnnotations();
});

var app = builder.Build();

app.UseCors("AllowAngularDev");

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(options =>
  {
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Fastasys API v1");
    options.RoutePrefix = string.Empty;
  });
}

app.UseHttpsRedirection();

app.MapControllers();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

await app.RunAsync();
