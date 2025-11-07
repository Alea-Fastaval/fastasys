# Migration Issue: Boardgames & General Loans API

**Priority:** Low-Medium
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup)

## Description

Migrate boardgame lending library and general equipment loans systems from PHP to .NET.

## Current Implementation

**Controllers:**
- `BoardgamesController` - Game catalog, loans, presence checking
- `LoansController` - General equipment lending

**Features:**
- Catalog management
- Loan tracking
- Presence checking (physical inventory)
- Rankings
- Spreadsheet import

## Target Implementation

### API Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class BoardgamesController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BoardgameDto>>> GetBoardgames(
        [FromQuery] string search,
        [FromQuery] int? page,
        [FromQuery] int? pageSize)
    
    [HttpGet("{id}")]
    public async Task<ActionResult<BoardgameDto>> GetBoardgame(int id)
    
    [HttpPost]
    [Authorize(Policy = "LibraryManagement")]
    public async Task<ActionResult<BoardgameDto>> CreateBoardgame([FromBody] CreateBoardgameDto dto)
    
    [HttpPost("{id}/loan")]
    [Authorize]
    public async Task<ActionResult<LoanDto>> LoanBoardgame(int id, [FromBody] CreateLoanDto dto)
    
    [HttpPost("{id}/return")]
    [Authorize]
    public async Task<IActionResult> ReturnBoardgame(int id, [FromBody] ReturnLoanDto dto)
    
    [HttpGet("{id}/loans")]
    public async Task<ActionResult<IEnumerable<LoanDto>>> GetBoardgameLoans(int id)
    
    [HttpPost("presence-check")]
    [Authorize(Policy = "LibraryManagement")]
    public async Task<ActionResult<PresenceCheckResult>> PerformPresenceCheck([FromBody] PresenceCheckDto dto)
    
    [HttpGet("rankings")]
    public async Task<ActionResult<IEnumerable<BoardgameRanking>>> GetRankings()
    
    [HttpPost("import")]
    [Authorize(Policy = "LibraryManagement")]
    public async Task<ActionResult<ImportResult>> ImportBoardgames([FromForm] IFormFile file)
}

[ApiController]
[Route("api/[controller]")]
public class LoansController : ControllerBase
{
    [HttpGet("items")]
    public async Task<ActionResult<IEnumerable<LoanItemDto>>> GetLoanItems()
    
    [HttpGet("items/{id}")]
    public async Task<ActionResult<LoanItemDto>> GetLoanItem(int id)
    
    [HttpPost("items")]
    [Authorize(Policy = "LoanManagement")]
    public async Task<ActionResult<LoanItemDto>> CreateLoanItem([FromBody] CreateLoanItemDto dto)
    
    [HttpPost("items/{id}/loan")]
    [Authorize]
    public async Task<ActionResult<LoanDto>> LoanItem(int id, [FromBody] CreateLoanDto dto)
    
    [HttpGet("active")]
    public async Task<ActionResult<IEnumerable<ActiveLoanDto>>> GetActiveLoans()
}
```

### Entity Models

```csharp
public class Boardgame
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Publisher { get; set; }
    public int? MinPlayers { get; set; }
    public int? MaxPlayers { get; set; }
    public int? PlayingTime { get; set; }
    public int? MinAge { get; set; }
    public string BarCode { get; set; }
    public bool IsPresent { get; set; }
    
    public virtual ICollection<BoardgameLoan> Loans { get; set; }
}

public class BoardgameLoan
{
    public int Id { get; set; }
    public int BoardgameId { get; set; }
    public int ParticipantId { get; set; }
    public DateTime LoanedAt { get; set; }
    public DateTime? ReturnedAt { get; set; }
    
    public virtual Boardgame Boardgame { get; set; }
    public virtual Participant Participant { get; set; }
}

public class LoanItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    
    public virtual ICollection<ItemLoan> Loans { get; set; }
}
```

## Acceptance Criteria

- [ ] Boardgame CRUD operations functional
- [ ] Loan/return operations working
- [ ] Presence checking functional
- [ ] Rankings calculation working
- [ ] Spreadsheet import working
- [ ] General equipment loans working
- [ ] Unit tests written
- [ ] Angular components implemented
- [ ] Search and filtering working

## Labels

`backend`, `api`, `low-priority`, `boardgames`, `loans`, `library`
