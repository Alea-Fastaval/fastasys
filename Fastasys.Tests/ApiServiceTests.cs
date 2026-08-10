using Fastasys.ApiService.Controllers;
using Fastasys.ApiService.Data;
using Fastasys.ApiService.Data.Entities;
using Fastasys.ApiService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace Fastasys.Tests;

public class ApiServiceTests
{
    private InfosysDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<InfosysDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        var context = new InfosysDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    [Fact]
    public async Task AuthService_Login_ValidCredentials_ReturnsToken()
    {
        using var db = CreateDbContext();
        var user = new User
        {
            Username = "testuser",
            PasswordHash = "password123",
            Email = "test@example.com",
            FirstName = "Test",
            LastName = "User",
            IsActive = true
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var config = new ConfigurationBuilder().AddInMemoryCollection().Build();
        var authService = new AuthService(db, config);

        var result = await authService.LoginAsync(new LoginDto("testuser", "password123"));

        Assert.NotNull(result);
        Assert.NotEmpty(result.Token);
        Assert.Equal("testuser", result.User.Username);
    }

    [Fact]
    public async Task DbSeeder_SeedsAdminUser_EvenIfDatabaseNotEmpty()
    {
        using var db = CreateDbContext();

        // Simulate database that has another existing user
        db.Users.Add(new User
        {
            Username = "otheruser",
            PasswordHash = "hash",
            Email = "other@example.com",
            FirstName = "Other",
            LastName = "User",
            IsActive = true
        });
        await db.SaveChangesAsync();

        // Run Seeder
        DbSeeder.Seed(db);

        // Verify admin user was created
        var admin = await db.Users.FirstOrDefaultAsync(u => u.Username == "admin");
        Assert.NotNull(admin);
        Assert.True(admin.IsActive);

        var config = new ConfigurationBuilder().AddInMemoryCollection().Build();
        var authService = new AuthService(db, config);

        var loginResult = await authService.LoginAsync(new LoginDto("admin", "admin123"));
        Assert.NotNull(loginResult);
        Assert.Equal("admin", loginResult.User.Username);
    }

    [Fact]
    public async Task ParticipantsController_GetAll_ReturnsParticipants()
    {
        using var db = CreateDbContext();
        db.Participants.Add(new Participant
        {
            FirstName = "Jane",
            LastName = "Doe",
            Email = "jane@example.com",
            Barcode = "EAN12345678"
        });
        await db.SaveChangesAsync();

        var controller = new ParticipantsController(db);

        var actionResult = await controller.GetAll(search: null);

        var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
        var list = Assert.IsAssignableFrom<IEnumerable<ParticipantDto>>(okResult.Value);
        Assert.Single(list);
    }

    [Fact]
    public async Task ParticipantsController_CheckIn_UpdatesStatus()
    {
        using var db = CreateDbContext();
        var participant = new Participant
        {
            FirstName = "John",
            LastName = "Smith",
            Email = "john@example.com",
            IsCheckedIn = false
        };
        db.Participants.Add(participant);
        await db.SaveChangesAsync();

        var controller = new ParticipantsController(db);

        var actionResult = await controller.CheckIn(participant.Id);

        Assert.IsType<OkObjectResult>(actionResult);
        var updated = await db.Participants.FindAsync(participant.Id);
        Assert.NotNull(updated);
        Assert.True(updated.IsCheckedIn);
        Assert.NotNull(updated.CheckedInAt);
    }

    [Fact]
    public async Task ActivitiesController_Create_AddsNewActivity()
    {
        using var db = CreateDbContext();
        var controller = new ActivitiesController(db);

        var dto = new CreateActivityDto(
            Title: "Dungeons & Dragons",
            TitleEnglish: "D&D 5e",
            Description: "Epic quest",
            Author: "DM Bob",
            MinParticipants: 3,
            MaxParticipants: 6,
            DurationMinutes: 240,
            Category: "Roleplaying"
        );

        var result = await controller.Create(dto);

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var item = Assert.IsType<ActivityDto>(created.Value);
        Assert.Equal("Dungeons & Dragons", item.Title);
    }

    [Fact]
    public async Task PaymentsController_CreatePayment_ReturnsTransactionId()
    {
        using var db = CreateDbContext();
        var participant = new Participant { FirstName = "Alice", LastName = "Wonder" };
        db.Participants.Add(participant);
        await db.SaveChangesAsync();

        var mockPaymentService = new MockPaymentService(Microsoft.Extensions.Logging.Abstractions.NullLogger<MockPaymentService>.Instance);
        var controller = new PaymentsController(db, mockPaymentService);
        var result = await controller.CreatePayment(new CreatePaymentRequestDto(participant.Id, 250.00m));

        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task AuthService_Login_LegacyMd5Password_UpgradesToBCrypt()
    {
        using var db = CreateDbContext();

        // Compute MD5 of "legacy123"
        using var md5 = System.Security.Cryptography.MD5.Create();
        var bytes = System.Text.Encoding.UTF8.GetBytes("legacy123");
        var md5Hash = Convert.ToHexString(md5.ComputeHash(bytes)).ToLowerInvariant();

        var user = new User
        {
            Username = "legacyuser",
            PasswordHash = md5Hash,
            Email = "legacy@example.com",
            FirstName = "Legacy",
            LastName = "User",
            IsActive = true
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var config = new ConfigurationBuilder().AddInMemoryCollection().Build();
        var authService = new AuthService(db, config);

        var response = await authService.LoginAsync(new LoginDto("legacyuser", "legacy123"));

        Assert.NotNull(response);
        var updatedUser = await db.Users.FindAsync(user.Id);
        Assert.NotNull(updatedUser);
        Assert.StartsWith("$2", updatedUser.PasswordHash); // Hash successfully upgraded to BCrypt!
    }

    [Fact]
    public async Task BoardgamesController_CheckoutAndReturn_UpdatesStatus()
    {
        using var db = CreateDbContext();
        var game = new Boardgame { Title = "Catan", IsPresent = true, Barcode = "BG001" };
        var participant = new Participant { FirstName = "Bob", LastName = "Builder" };
        db.Boardgames.Add(game);
        db.Participants.Add(participant);
        await db.SaveChangesAsync();

        var controller = new BoardgamesController(db);
        var checkoutResult = await controller.Checkout(game.Id, new CheckoutBoardgameDto(participant.Id));
        Assert.IsType<OkObjectResult>(checkoutResult);

        var updatedGame = await db.Boardgames.FindAsync(game.Id);
        Assert.NotNull(updatedGame);
        Assert.False(updatedGame.IsPresent);

        var returnResult = await controller.Return(game.Id);
        Assert.IsType<OkObjectResult>(returnResult);
        Assert.True(updatedGame.IsPresent);
    }

    [Fact]
    public async Task ShopController_CreateOrder_DecreasesStockAndCreatesSale()
    {
        using var db = CreateDbContext();
        var product = new Product { Name = "T-Shirt", Price = 100m, Stock = 10, IsActive = true };
        db.Products.Add(product);
        await db.SaveChangesAsync();

        var controller = new ShopController(db);
        var result = await controller.CreateOrder(new CreateOrderDto(product.Id, 2, null));

        Assert.IsType<OkObjectResult>(result);
        var updatedProduct = await db.Products.FindAsync(product.Id);
        Assert.NotNull(updatedProduct);
        Assert.Equal(8, updatedProduct.Stock);
    }

    [Fact]
    public async Task TicketsController_CreateTicket_AddsTicket()
    {
        using var db = CreateDbContext();
        var user = new User { Username = "ticketuser", PasswordHash = "hash", Email = "u@test.com", FirstName = "U", LastName = "S" };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var controller = new TicketsController(db);
        var result = await controller.CreateTicket(new CreateTicketDto("Need Help", "I lost my badge", user.Id));

        Assert.IsType<OkObjectResult>(result);
        Assert.Single(db.Tickets);
    }

    [Fact]
    public async Task OpenApi_Scalar_And_SwaggerUI_Endpoints_ReturnSuccess()
    {
        await using var factory = new Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory<Fastasys.ApiService.Program>();

        var client = factory.CreateClient(new Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        var swaggerJsonResp = await client.GetAsync("/swagger/v1/swagger.json");
        Assert.Equal(HttpStatusCode.OK, swaggerJsonResp.StatusCode);
        var swaggerJson = await swaggerJsonResp.Content.ReadAsStringAsync();
        Assert.Contains("/api/Participants", swaggerJson);
        Assert.Contains("/api/Auth/login", swaggerJson);

        Assert.Contains("/api/Activities", swaggerJson);




        var scalarResp = await client.GetAsync("/scalar/v1");
        Assert.Equal(HttpStatusCode.OK, scalarResp.StatusCode);

        var swaggerResp = await client.GetAsync("/swagger/index.html");
        Assert.Equal(HttpStatusCode.OK, swaggerResp.StatusCode);

        var rootResp = await client.GetAsync("/");
        Assert.True(rootResp.StatusCode == HttpStatusCode.Found || rootResp.StatusCode == HttpStatusCode.MovedPermanently);
        Assert.Equal("/scalar/v1", rootResp.Headers.Location?.OriginalString);
    }
}


