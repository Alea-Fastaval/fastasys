using System.Text;
using Fastasys.ApiService.Data;
using Fastasys.ApiService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();

// Add DbContext
var connectionString = builder.Configuration.GetConnectionString("fasta2026")
    ?? builder.Configuration.GetConnectionString("infosysdb")
    ?? builder.Configuration.GetConnectionString("mysql");
if (string.IsNullOrEmpty(connectionString))
{
    // Fallback connection string for local development/testing
    connectionString = "Server=localhost;Database=infosys;User=root;Password=root;";
}

bool useInMemory = false;
try
{
    using var testConn = new MySql.Data.MySqlClient.MySqlConnection(connectionString);
    testConn.Open();
}
catch
{
    useInMemory = true;
}

builder.Services.AddDbContext<InfosysDbContext>(options =>
{
    if (useInMemory)
    {
        options.UseInMemoryDatabase("InfosysDbFallback");
    }
    else
    {
        options.UseMySQL(connectionString);
    }
});

// Register custom services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<IMockPaymentService, MockPaymentService>();
builder.Services.AddSingleton<IMockNotificationService, MockNotificationService>();

// JWT Authentication Setup
var jwtSecret = builder.Configuration["Jwt:Secret"] ?? "FastasysSuperSecretSecurityKey2026!FormatLengthForHS256";
var key = Encoding.UTF8.GetBytes(jwtSecret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ParticipantManagement", policy =>
        policy.RequireAssertion(context => context.User.IsInRole("Admin") || context.User.HasClaim("privilege", "participant_management")));

    options.AddPolicy("ActivityManagement", policy =>
        policy.RequireAssertion(context => context.User.IsInRole("Admin") || context.User.HasClaim("privilege", "activity_management")));

    options.AddPolicy("HeroForceManagement", policy =>
        policy.RequireAssertion(context => context.User.IsInRole("Admin") || context.User.HasClaim("privilege", "hero_force_management")));

    options.AddPolicy("ShopManagement", policy =>
        policy.RequireAssertion(context => context.User.IsInRole("Admin") || context.User.HasClaim("privilege", "shop_management")));
});

// Add Controllers, EndpointsApiExplorer & SwaggerGen documentation metadata
builder.Services.AddControllers()
    .AddApplicationPart(typeof(Fastasys.ApiService.Controllers.ParticipantsController).Assembly);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddProblemDetails();


builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Info = new OpenApiInfo
        {
            Title = "Fastasys API",
            Version = "v1",
            Description = "Fastaval Convention Management System - ASP.NET Core Web API"
        };

        var securityScheme = new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Description = "Enter JWT Bearer token format: `Bearer {your_token}`",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT"
        };

        document.Components ??= new OpenApiComponents();
        var schemes = document.Components.SecuritySchemes ?? new Dictionary<string, IOpenApiSecurityScheme>();
        schemes["Bearer"] = securityScheme;
        document.Components.SecuritySchemes = schemes;

        return Task.CompletedTask;
    });
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Fastasys API",
        Version = "v1",
        Description = "Fastaval Convention Management System - ASP.NET Core Web API"
    });

    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter JWT Bearer token format: `Bearer {your_token}`",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    };

    options.AddSecurityDefinition("Bearer", jwtSecurityScheme);
    options.AddSecurityRequirement((doc) => new OpenApiSecurityRequirement
    {
        { new OpenApiSecuritySchemeReference("Bearer"), new List<string>() }
    });



});

var app = builder.Build();

// Configure HTTP pipeline
app.UseExceptionHandler();

app.UseAuthentication();
app.UseAuthorization();

// Map controllers first so endpoint routing metadata is available
app.MapControllers();
app.MapDefaultEndpoints();

// Enable Swagger JSON & OpenAPI
app.UseSwagger();
app.MapOpenApi();

// Modern Scalar API Reference UI at /scalar/v1
app.MapScalarApiReference(options =>
{
    options.Title = "Fastasys API Reference";
    options.Theme = ScalarTheme.Purple;
    options.WithOpenApiRoutePattern("/swagger/v1/swagger.json");
});

// Classic Swagger UI at /swagger
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Fastasys API v1");
    options.RoutePrefix = "swagger";
});


// Friendly redirects so visiting /, /scalar, or /docs takes you straight to Scalar UI
app.MapGet("/", () => Results.Redirect("/scalar/v1"));
app.MapGet("/scalar", () => Results.Redirect("/scalar/v1"));
app.MapGet("/docs", () => Results.Redirect("/scalar/v1"));


// Seed initial database in fallback / dev mode
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<InfosysDbContext>();
    db.Database.EnsureCreated();
    DbSeeder.Seed(db);
}

app.Run();

namespace Fastasys.ApiService
{
    public partial class Program {}
}



