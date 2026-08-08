# Migration Issue: Resources Management API (Food, Wear, Entrance, Rooms)

**Priority:** Medium
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup)

## Description

Migrate resource management systems from PHP to .NET. This includes food/catering, merchandise/wear, entrance types, and room management.

## Current Implementation

**Controllers:**
- `FoodController` - Meal types and orders
- `WearController` - Merchandise/uniform items
- `EntranceController` - Entrance type management
- `RoomsController` - Room and facility management

## Target Implementation

### API Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class FoodController : ControllerBase
{
    [HttpGet("types")]
    public async Task<ActionResult<IEnumerable<FoodTypeDto>>> GetFoodTypes()
    
    [HttpPost("types")]
    [Authorize(Policy = "ResourceManagement")]
    public async Task<ActionResult<FoodTypeDto>> CreateFoodType([FromBody] CreateFoodTypeDto dto)
    
    [HttpGet("orders")]
    public async Task<ActionResult<IEnumerable<FoodOrderDto>>> GetOrders()
    
    [HttpPost("orders")]
    public async Task<ActionResult<FoodOrderDto>> CreateOrder([FromBody] CreateFoodOrderDto dto)
}

[ApiController]
[Route("api/[controller]")]
public class WearController : ControllerBase
{
    [HttpGet("items")]
    public async Task<ActionResult<IEnumerable<WearItemDto>>> GetWearItems()
    
    [HttpGet("sizes")]
    public async Task<ActionResult<IEnumerable<string>>> GetSizes()
    
    [HttpPost("items")]
    [Authorize(Policy = "ResourceManagement")]
    public async Task<ActionResult<WearItemDto>> CreateWearItem([FromBody] CreateWearItemDto dto)
}

[ApiController]
[Route("api/[controller]")]
public class EntranceController : ControllerBase
{
    [HttpGet("types")]
    public async Task<ActionResult<IEnumerable<EntranceTypeDto>>> GetEntranceTypes()
    
    [HttpPost("types")]
    [Authorize(Policy = "ResourceManagement")]
    public async Task<ActionResult<EntranceTypeDto>> CreateEntranceType([FromBody] CreateEntranceTypeDto dto)
}

[ApiController]
[Route("api/[controller]")]
public class RoomsController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomDto>>> GetRooms()
    
    [HttpGet("{id}")]
    public async Task<ActionResult<RoomDto>> GetRoom(int id)
    
    [HttpPost]
    [Authorize(Policy = "ResourceManagement")]
    public async Task<ActionResult<RoomDto>> CreateRoom([FromBody] CreateRoomDto dto)
    
    [HttpGet("{id}/availability")]
    public async Task<ActionResult<RoomAvailability>> GetAvailability(
        int id,
        [FromQuery] DateTime startDate,
        [FromQuery] DateTime endDate)
}
```

### Entity Models

```csharp
public class FoodType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    
    public virtual ICollection<ParticipantFood> ParticipantFoodOrders { get; set; }
}

public class WearItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Size { get; set; }
    public int Stock { get; set; }
    
    public virtual ICollection<ParticipantWear> ParticipantWearItems { get; set; }
}

public class Room
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Capacity { get; set; }
    public string Layout { get; set; }
    public string Equipment { get; set; }
    
    public virtual ICollection<Schedule> Schedules { get; set; }
}
```

## Acceptance Criteria

- [ ] Food type CRUD operations functional
- [ ] Wear item management working
- [ ] Entrance type management working
- [ ] Room CRUD operations functional
- [ ] Room availability checking working
- [ ] Assignment to participants working
- [ ] Reporting endpoints functional
- [ ] Unit tests written
- [ ] Angular components for each resource type

## Labels

`backend`, `api`, `medium-priority`, `resources`, `food`, `wear`, `entrance`, `rooms`
