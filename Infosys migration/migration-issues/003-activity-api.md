# Migration Issue: Activity & Schedule Management API

**Priority:** High
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** #002 (Authentication)

## Description

Migrate activity and schedule management system from PHP to .NET. This includes game/activity creation, scheduling, GM assignment, and participant signups.

## Current Implementation

**Controller:** `ActivityController` (include/controllers/activity_controller.php)
**Routes:** ~30 endpoints under `/aktivitet/*`
**Related entities:** Activities, Schedules (Afvikling), Groups (Hold)

## Target Implementation

### Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class ActivitiesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> GetAll()
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> Get(int id)
    
    [HttpPost]
    [Authorize(Policy = "ActivityManagement")]
    public async Task<ActionResult<ActivityDto>> Create([FromBody] CreateActivityDto dto)
    
    [HttpPut("{id}")]
    [Authorize(Policy = "ActivityManagement")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateActivityDto dto)
    
    [HttpGet("{id}/schedules")]
    public async Task<ActionResult<IEnumerable<ScheduleDto>>> GetSchedules(int id)
    
    [HttpPost("{id}/schedules")]
    [Authorize(Policy = "ActivityManagement")]
    public async Task<ActionResult<ScheduleDto>> CreateSchedule(int id, [FromBody] CreateScheduleDto dto)
}

[ApiController]
[Route("api/[controller]")]
public class SchedulesController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<ScheduleDto>> Get(int id)
    
    [HttpPost("{id}/participants")]
    [Authorize]
    public async Task<IActionResult> AddParticipant(int id, [FromBody] AddParticipantDto dto)
    
    [HttpDelete("{id}/participants/{participantId}")]
    [Authorize]
    public async Task<IActionResult> RemoveParticipant(int id, int participantId)
}
```

### Entity Framework Models

```csharp
public class Activity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public string Description { get; set; }
    public int MinParticipants { get; set; }
    public int MaxParticipants { get; set; }
    public TimeSpan Duration { get; set; }
    public virtual ActivityType Type { get; set; }
    public virtual ICollection<Schedule> Schedules { get; set; }
}

public class Schedule  // (Afvikling)
{
    public int Id { get; set; }
    public int ActivityId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int? RoomId { get; set; }
    public virtual Activity Activity { get; set; }
    public virtual Room Room { get; set; }
    public virtual ICollection<ParticipantSchedule> Participants { get; set; }
}
```

## Acceptance Criteria

- [ ] Activity CRUD operations functional
- [ ] Schedule creation and management working
- [ ] GM assignment working
- [ ] Participant signup/assignment working
- [ ] Conflict detection (double bookings)
- [ ] Room assignment integration
- [ ] API documentation complete
- [ ] Unit tests written
- [ ] Integration tests for workflows
- [ ] Angular components implemented
- [ ] Calendar view functional

## Labels

`backend`, `api`, `high-priority`, `activity-management`

