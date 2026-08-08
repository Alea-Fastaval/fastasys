using Fastasys.ApiService.Data;
using Fastasys.ApiService.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fastasys.ApiService.Controllers;

public record OrderFoodDto(int ParticipantId, int FoodTypeId, DateTime Date, int Quantity = 1);
public record OrderWearDto(int ParticipantId, int WearItemId, int Quantity = 1);
public record CreateRoomDto(string Name, string Location, int Capacity, string Description);

[ApiController]
[Route("api/[controller]")]
public class FoodController : ControllerBase
{
    private readonly InfosysDbContext _db;
    public FoodController(InfosysDbContext db) => _db = db;

    [HttpGet("types")]
    public async Task<IActionResult> GetTypes()
    {
        var types = await _db.FoodTypes.AsNoTracking().Where(f => f.IsActive).ToListAsync();
        return Ok(types);
    }

    [HttpPost("order")]
    public async Task<IActionResult> OrderFood([FromBody] OrderFoodDto dto)
    {
        var food = await _db.FoodTypes.FindAsync(dto.FoodTypeId);
        if (food == null) return NotFound(new { message = "Food type not found" });

        var participantFood = new ParticipantFood
        {
            ParticipantId = dto.ParticipantId,
            FoodTypeId = dto.FoodTypeId,
            Date = dto.Date.Date,
            Quantity = dto.Quantity
        };

        _db.ParticipantFoods.Add(participantFood);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Food ordered successfully" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class WearController : ControllerBase
{
    private readonly InfosysDbContext _db;
    public WearController(InfosysDbContext db) => _db = db;

    [HttpGet("items")]
    public async Task<IActionResult> GetItems()
    {
        var items = await _db.WearItems.AsNoTracking().ToListAsync();
        return Ok(items);
    }

    [HttpPost("order")]
    public async Task<IActionResult> OrderWear([FromBody] OrderWearDto dto)
    {
        var wear = await _db.WearItems.FindAsync(dto.WearItemId);
        if (wear == null) return NotFound(new { message = "Wear item not found" });

        if (wear.Stock < dto.Quantity) return BadRequest(new { message = "Insufficient wear stock" });

        wear.Stock -= dto.Quantity;
        var participantWear = new ParticipantWear
        {
            ParticipantId = dto.ParticipantId,
            WearItemId = dto.WearItemId,
            Quantity = dto.Quantity
        };

        _db.ParticipantWears.Add(participantWear);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Wear ordered successfully" });
    }
}

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    private readonly InfosysDbContext _db;
    public RoomsController(InfosysDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetRooms()
    {
        var rooms = await _db.Rooms.AsNoTracking().ToListAsync();
        return Ok(rooms);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateRoom([FromBody] CreateRoomDto dto)
    {
        var room = new Room
        {
            Name = dto.Name,
            Location = dto.Location,
            Capacity = dto.Capacity,
            Description = dto.Description
        };

        _db.Rooms.Add(room);
        await _db.SaveChangesAsync();
        return Ok(room);
    }
}
