# Migration Issue: Participant/Attendee API

**Priority:** High
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** Core authentication, database setup

## Description

Migrate the Participant (Deltager) management API endpoints from PHP to .NET Web API. This is a critical core feature that manages convention attendees.

## Current Implementation

**Controller:** `ParticipantController` (include/controllers/participant_controller.php)
**Routes:** ~70 endpoints under `/deltager/*` and `/participant/*`
**Key Endpoints:**
- Participant CRUD operations
- Check-in system
- Payment interface
- Schedule management
- Badge/barcode generation
- SMS/Email notifications

## Target Implementation

### .NET Web API

Create `ParticipantsController.cs` in `/Controllers/Api`

**Endpoints to implement:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class ParticipantsController : ControllerBase
{
    // GET: api/participants
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ParticipantDto>>> GetAll()
    
    // GET: api/participants/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ParticipantDto>> Get(int id)
    
    // POST: api/participants
    [HttpPost]
    public async Task<ActionResult<ParticipantDto>> Create([FromBody] CreateParticipantDto dto)
    
    // PUT: api/participants/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateParticipantDto dto)
    
    // GET: api/participants/{id}/schedule
    [HttpGet("{id}/schedule")]
    public async Task<ActionResult<ScheduleDto>> GetSchedule(int id)
    
    // POST: api/participants/{id}/checkin
    [HttpPost("{id}/checkin")]
    public async Task<IActionResult> CheckIn(int id)
    
    // GET: api/participants/{id}/barcode
    [HttpGet("{id}/barcode")]
    public async Task<IActionResult> GetBarcode(int id)
}
```

### Entity Framework Models

**Create entity:** `Participant.cs` (map to `deltagere` table)

```csharp
public class Participant
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public DateTime BirthDate { get; set; }
    public DateTime CreatedAt { get; set; }
    // ... additional fields from existing schema
    
    // Navigation properties
    public virtual ICollection<ActivitySignup> ActivitySignups { get; set; }
    public virtual ICollection<Payment> Payments { get; set; }
}
```

### Services

Create `IParticipantService` interface and `ParticipantService` implementation:
- Business logic extraction from controller
- Validation
- Barcode generation
- Email/SMS integration

### DTOs

Create data transfer objects:
- `ParticipantDto`
- `CreateParticipantDto`
- `UpdateParticipantDto`
- `ParticipantListDto`
- `ParticipantScheduleDto`

### Angular Frontend

**Component:** `participant-list.component.ts`
**Routes:** `/deltager/*`

Features:
- List view with search/filter
- Detail view
- Edit form
- Check-in interface
- Payment interface

## Acceptance Criteria

- [ ] All participant CRUD operations functional
- [ ] Check-in system working
- [ ] Payment interface integrated
- [ ] Barcode generation working (EAN8)
- [ ] Schedule viewing functional
- [ ] Email notifications working
- [ ] SMS notifications working
- [ ] Unit tests written (80%+ coverage)
- [ ] Integration tests for critical paths
- [ ] API documentation (Swagger)
- [ ] Angular components implemented
- [ ] E2E tests for main workflows

## Technical Notes

- Preserve existing MySQL schema
- Maintain backward compatibility during transition
- Use AutoMapper for DTO mapping
- Implement proper authorization (role-based)
- Add proper logging
- Consider caching for frequently accessed data

## Related Issues

- #002 (Authentication)
- #003 (Activity API)
- #005 (Payment Integration)

## Labels

`backend`, `api`, `high-priority`, `participant-management`

