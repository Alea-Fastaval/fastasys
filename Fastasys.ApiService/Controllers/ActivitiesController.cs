using Fastasys.ApiService.Data;
using Fastasys.ApiService.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fastasys.ApiService.Controllers;

public record ActivityDto(
    int Id,
    string Title,
    string TitleEnglish,
    string Description,
    string Author,
    int MinParticipants,
    int MaxParticipants,
    int DurationMinutes,
    string Category,
    bool IsActive
);

public record CreateActivityDto(
    string Title,
    string TitleEnglish,
    string Description,
    string Author,
    int MinParticipants,
    int MaxParticipants,
    int DurationMinutes,
    string Category
);

public record ScheduleDto(
    int Id,
    int ActivityId,
    string ActivityTitle,
    DateTime StartTime,
    DateTime EndTime,
    int? RoomId,
    string? RoomName,
    int ParticipantCount
);

public record CreateScheduleDto(
    DateTime StartTime,
    DateTime EndTime,
    int? RoomId
);

[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    private readonly InfosysDbContext _db;

    public ActivitiesController(InfosysDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAll()
    {
        var activities = await _db.Activities
            .AsNoTracking()
            .Where(a => a.IsActive)
            .Select(a => ToDto(a))
            .ToListAsync();

        return Ok(activities);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ActivityDto>> Get(int id)
    {
        var activity = await _db.Activities.FindAsync(id);
        if (activity == null) return NotFound();
        return Ok(ToDto(activity));
    }

    [HttpPost]
    [Authorize(Policy = "ActivityManagement")]
    public async Task<ActionResult<ActivityDto>> Create([FromBody] CreateActivityDto dto)
    {
        var activity = new Activity
        {
            Title = dto.Title,
            TitleEnglish = dto.TitleEnglish,
            Description = dto.Description,
            Author = dto.Author,
            MinParticipants = dto.MinParticipants,
            MaxParticipants = dto.MaxParticipants,
            DurationMinutes = dto.DurationMinutes,
            Category = dto.Category,
            IsActive = true
        };

        _db.Activities.Add(activity);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = activity.Id }, ToDto(activity));
    }

    [HttpGet("{id:int}/schedules")]
    public async Task<ActionResult<IEnumerable<ScheduleDto>>> GetSchedules(int id)
    {
        var schedules = await _db.Schedules
            .Include(s => s.Activity)
            .Include(s => s.Room)
            .Include(s => s.ParticipantSchedules)
            .Where(s => s.ActivityId == id)
            .Select(s => new ScheduleDto(
                s.Id,
                s.ActivityId,
                s.Activity.Title,
                s.StartTime,
                s.EndTime,
                s.RoomId,
                s.Room != null ? s.Room.Name : null,
                s.ParticipantSchedules.Count
            ))
            .ToListAsync();

        return Ok(schedules);
    }

    [HttpPost("{id:int}/schedules")]
    [Authorize(Policy = "ActivityManagement")]
    public async Task<ActionResult<ScheduleDto>> CreateSchedule(int id, [FromBody] CreateScheduleDto dto)
    {
        var activity = await _db.Activities.FindAsync(id);
        if (activity == null) return NotFound("Activity not found");

        var schedule = new Schedule
        {
            ActivityId = id,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            RoomId = dto.RoomId
        };

        _db.Schedules.Add(schedule);
        await _db.SaveChangesAsync();

        return Ok(new ScheduleDto(
            schedule.Id,
            schedule.ActivityId,
            activity.Title,
            schedule.StartTime,
            schedule.EndTime,
            schedule.RoomId,
            null,
            0
        ));
    }

    private static ActivityDto ToDto(Activity a) => new(
        a.Id,
        a.Title,
        a.TitleEnglish,
        a.Description,
        a.Author,
        a.MinParticipants,
        a.MaxParticipants,
        a.DurationMinutes,
        a.Category,
        a.IsActive
    );
}
