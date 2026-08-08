using System.Text;
using Fastasys.ApiService.Data;
using Fastasys.ApiService.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

// Add Controllers & OpenAPI
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure HTTP pipeline
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapDefaultEndpoints();

// Seed initial database in fallback / dev mode
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<InfosysDbContext>();
    db.Database.EnsureCreated();
    DbSeeder.Seed(db);
}

app.Run();
