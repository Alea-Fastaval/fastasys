using System.Net;
using Xunit;

namespace Fastasys.Tests;

public class WebTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public WebTests(TestWebApplicationFactory factory)
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
