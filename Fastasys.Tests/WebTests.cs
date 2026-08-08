using System.Net;
using Fastasys.ApiService.Controllers;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace Fastasys.Tests;

public class WebTests : IClassFixture<WebApplicationFactory<AuthController>>
{
    private readonly WebApplicationFactory<AuthController> _factory;

    public WebTests(WebApplicationFactory<AuthController> factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task GetActivities_ReturnsSuccessStatusCode()
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        var client = _factory.CreateClient();
        var response = await client.GetAsync("/api/activities", cancellationToken);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
