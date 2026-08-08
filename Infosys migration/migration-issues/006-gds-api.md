# Migration Issue: GDS Shift Management API

**Priority:** High
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup)

## Description

Migrate GDS (shift) management system from PHP to .NET. This includes shift scheduling, category management, calendar views, and shift assignments.

## Current Implementation

**Controller:** `GdsController` (include/controllers/gds_controller.php)
**Routes:** ~20 endpoints under `/gds/*`
**Features:**
- Calendar view
- Shift creation/editing/deletion
- Category management
- Blank shift generation
- Shift details and assignments

## Target Implementation

### Controllers

```csharp
[ApiController]
[Route("api/gds")]
public class GdsController : ControllerBase
{
    [HttpGet("shifts")]
    public async Task<ActionResult<IEnumerable<GdsShiftDto>>> GetShifts(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate,
        [FromQuery] int? categoryId)
    
    [HttpGet("shifts/{id}")]
    public async Task<ActionResult<GdsShiftDto>> GetShift(int id)
    
    [HttpPost("shifts")]
    [Authorize(Policy = "GdsManagement")]
    public async Task<ActionResult<GdsShiftDto>> CreateShift([FromBody] CreateGdsShiftDto dto)
    
    [HttpPut("shifts/{id}")]
    [Authorize(Policy = "GdsManagement")]
    public async Task<IActionResult> UpdateShift(int id, [FromBody] UpdateGdsShiftDto dto)
    
    [HttpDelete("shifts/{id}")]
    [Authorize(Policy = "GdsManagement")]
    public async Task<IActionResult> DeleteShift(int id)
    
    [HttpGet("categories")]
    public async Task<ActionResult<IEnumerable<GdsCategoryDto>>> GetCategories()
    
    [HttpPost("categories")]
    [Authorize(Policy = "GdsManagement")]
    public async Task<ActionResult<GdsCategoryDto>> CreateCategory([FromBody] CreateGdsCategoryDto dto)
}
```

### Entity Framework Models

```csharp
public class GdsShift
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int MaxParticipants { get; set; }
    public string Description { get; set; }
    
    public virtual GdsCategory Category { get; set; }
    public virtual ICollection<GdsShiftParticipant> Participants { get; set; }
}

public class GdsCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Color { get; set; }  // For calendar display
    
    public virtual ICollection<GdsShift> Shifts { get; set; }
}
```

### Angular Components

- **gds-calendar.component** - Calendar view with drag-and-drop
- **gds-shift-editor.component** - Shift creation/editing
- **gds-category-manager.component** - Category CRUD

## Acceptance Criteria

- [ ] Shift CRUD operations functional
- [ ] Category management working
- [ ] Calendar view with filtering
- [ ] Shift assignment working
- [ ] Conflict detection
- [ ] AJAX updates working
- [ ] Unit tests written
- [ ] Integration tests
- [ ] Angular components implemented
- [ ] Calendar library integrated (FullCalendar or similar)

## Labels

`backend`, `api`, `high-priority`, `gds-management`, `scheduling`
