using api;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherForecastController : ControllerBase
{
  private static readonly string[] Summaries = [
      "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
  ];

  [HttpGet()]
  [SwaggerResponse(200, "Successfully retrieved weather forecast", typeof(IEnumerable<WeatherForecast>))]
  [SwaggerResponse(500, "Internal server error")]
  [ProducesResponseType(typeof(IEnumerable<WeatherForecast>), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status500InternalServerError)]
  public ActionResult<IEnumerable<WeatherForecast>> Get()
  {
    try
    {
      var forecasts = Enumerable.Range(1, 5).Select(index => new WeatherForecast
      {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
      }).ToArray();

      return Ok(forecasts);
    }
    catch (Exception ex)
    {
      return StatusCode(500, new { error = "Failed to retrieve weather forecast", details = ex.Message });
    }
  }

  [HttpGet("{date}")]
  [SwaggerResponse(200, "Successfully retrieved weather forecast", typeof(WeatherForecast))]
  [SwaggerResponse(400, "Invalid date format")]
  [SwaggerResponse(404, "Forecast not found for the specified date")]
  [ProducesResponseType(typeof(WeatherForecast), StatusCodes.Status200OK)]
  [ProducesResponseType(StatusCodes.Status400BadRequest)]
  [ProducesResponseType(StatusCodes.Status404NotFound)]
  public ActionResult<WeatherForecast> GetByDate([FromRoute] DateOnly date)
  {
    // Check if date is in the future
    if (date <= DateOnly.FromDateTime(DateTime.Now))
    {
      return BadRequest(new { error = "Date must be in the future" });
    }

    // Check if date is within 5 days
    if (date > DateOnly.FromDateTime(DateTime.Now.AddDays(5)))
    {
      return NotFound(new { error = "Forecast only available for next 5 days" });
    }

    var forecast = new WeatherForecast
    {
      Date = date,
      TemperatureC = Random.Shared.Next(-20, 55),
      Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    };

    return Ok(forecast);
  }
}
