using Fastasys.ApiService.Data;
using Fastasys.ApiService.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fastasys.ApiService.Controllers;

public record HeroForceCategoryDto(int Id, string Name, string Description, string ColorHex);
public record HeroForceShiftDto(int Id, int CategoryId, string CategoryName, string Title, string Description, DateTime StartTime, DateTime EndTime, int MaxParticipants, int CurrentParticipants);
public record CreateHeroForceShiftDto(int CategoryId, string Title, string Description, DateTime StartTime, DateTime EndTime, int MaxParticipants);

[ApiController]
[Route("api/hero-force")]
public class HeroForceController : ControllerBase
{
    private readonly InfosysDbContext _db;

    public HeroForceController(InfosysDbContext db)
    {
        _db = db;
    }

    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<HeroForceCategoryDto>>> GetCategories()
    {
        var categories = await _db.HeroForceCategories
            .AsNoTracking()
            .Select(c => new HeroForceCategoryDto(c.Id, c.Name, c.Description, c.ColorHex))
            .ToListAsync();

        return Ok(categories);
    }

    [HttpGet("shifts")]
    public async Task<ActionResult<IEnumerable<HeroForceShiftDto>>> GetShifts([FromQuery] int? categoryId)
    {
        var query = _db.HeroForceShifts
            .AsNoTracking()
            .Include(s => s.Category)
            .Include(s => s.Participants)
            .AsQueryable();

        if (categoryId.HasValue)
        {
            query = query.Where(s => s.CategoryId == categoryId.Value);
        }

        var list = await query.Select(s => new HeroForceShiftDto(
            s.Id,
            s.CategoryId,
            s.Category.Name,
            s.Title,
            s.Description,
            s.StartTime,
            s.EndTime,
            s.MaxParticipants,
            s.Participants.Count
        )).ToListAsync();

        return Ok(list);
    }

    [HttpPost("shifts")]
    [Authorize(Policy = "HeroForceManagement")]
    public async Task<ActionResult<HeroForceShiftDto>> CreateShift([FromBody] CreateHeroForceShiftDto dto)
    {
        var category = await _db.HeroForceCategories.FindAsync(dto.CategoryId);
        if (category == null) return BadRequest("Invalid category ID");

        var shift = new HeroForceShift
        {
            CategoryId = dto.CategoryId,
            Title = dto.Title,
            Description = dto.Description,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            MaxParticipants = dto.MaxParticipants
        };

        _db.HeroForceShifts.Add(shift);
        await _db.SaveChangesAsync();

        return Ok(new HeroForceShiftDto(shift.Id, shift.CategoryId, category.Name, shift.Title, shift.Description, shift.StartTime, shift.EndTime, shift.MaxParticipants, 0));
    }
}
