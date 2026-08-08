# Migration Issue: Communication Systems (Newsletter, Tickets, SMS, Email)

**Priority:** Medium
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup)

## Description

Migrate communication systems including newsletter management, support ticketing, SMS broadcasting, and email notifications from PHP to .NET.

## Current Implementation

**Controllers:**
- `NewsletterController` - Newsletter creation and management
- `TicketsController` - Support ticketing system
- `SmsController` - SMS broadcasting
- `MailController` - Email sending

## Target Implementation

### API Controllers

```csharp
[ApiController]
[Route("api/newsletters")]
public class NewslettersController : ControllerBase
{
    [HttpGet]
    [Authorize(Policy = "NewsletterManagement")]
    public async Task<ActionResult<IEnumerable<NewsletterDto>>> GetNewsletters()
    
    [HttpGet("{id}")]
    public async Task<ActionResult<NewsletterDto>> GetNewsletter(int id)
    
    [HttpPost]
    [Authorize(Policy = "NewsletterManagement")]
    public async Task<ActionResult<NewsletterDto>> CreateNewsletter([FromBody] CreateNewsletterDto dto)
    
    [HttpPost("{id}/send")]
    [Authorize(Policy = "NewsletterManagement")]
    public async Task<IActionResult> SendNewsletter(int id, [FromBody] SendOptionsDto options)
    
    [HttpPost("subscribe")]
    [AllowAnonymous]
    public async Task<IActionResult> Subscribe([FromBody] SubscribeDto dto)
    
    [HttpPost("unsubscribe")]
    [AllowAnonymous]
    public async Task<IActionResult> Unsubscribe([FromBody] UnsubscribeDto dto)
}

[ApiController]
[Route("api/tickets")]
public class TicketsController : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<TicketDto>>> GetTickets(
        [FromQuery] TicketStatus? status)
    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<TicketDto>> GetTicket(int id)
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<TicketDto>> CreateTicket([FromBody] CreateTicketDto dto)
    
    [HttpPost("{id}/messages")]
    [Authorize]
    public async Task<ActionResult<MessageDto>> AddMessage(int id, [FromBody] AddMessageDto dto)
    
    [HttpPut("{id}/status")]
    [Authorize(Policy = "TicketManagement")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    
    [HttpPost("{id}/subscribe")]
    [Authorize]
    public async Task<IActionResult> Subscribe(int id)
    
    [HttpDelete("{id}/subscribe")]
    [Authorize]
    public async Task<IActionResult> Unsubscribe(int id)
}

[ApiController]
[Route("api/sms")]
public class SmsController : ControllerBase
{
    [HttpPost("send")]
    [Authorize(Policy = "SmsManagement")]
    public async Task<ActionResult<SendSmsResult>> SendSms([FromBody] SendSmsDto dto)
    
    [HttpPost("broadcast")]
    [Authorize(Policy = "SmsManagement")]
    public async Task<ActionResult<BroadcastResult>> BroadcastSms([FromBody] BroadcastSmsDto dto)
    
    [HttpGet("history")]
    [Authorize(Policy = "SmsManagement")]
    public async Task<ActionResult<IEnumerable<SmsHistoryDto>>> GetHistory(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate)
}
```

### Services

```csharp
public interface IEmailService
{
    Task SendAsync(EmailMessage message);
    Task SendTemplatedAsync(string templateName, object data, string recipient);
    Task SendBulkAsync(IEnumerable<EmailMessage> messages);
}

public interface ISmsService
{
    Task SendAsync(string phoneNumber, string message);
    Task SendBulkAsync(IEnumerable<(string phoneNumber, string message)> messages);
}

public interface INewsletterService
{
    Task<Newsletter> CreateAsync(CreateNewsletterDto dto);
    Task SendAsync(int newsletterId, SendOptionsDto options);
    Task<bool> SubscribeAsync(string email);
    Task<bool> UnsubscribeAsync(string email);
}
```

### Entity Models

```csharp
public class Newsletter
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? SentAt { get; set; }
    public int? RecipientCount { get; set; }
    
    public virtual ICollection<NewsletterSubscription> Subscriptions { get; set; }
}

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public TicketStatus Status { get; set; }
    public int CreatedById { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
    
    public virtual User CreatedBy { get; set; }
    public virtual ICollection<TicketMessage> Messages { get; set; }
    public virtual ICollection<TicketSubscription> Subscriptions { get; set; }
}

public class TicketMessage
{
    public int Id { get; set; }
    public int TicketId { get; set; }
    public int UserId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public virtual Ticket Ticket { get; set; }
    public virtual User User { get; set; }
}

public enum TicketStatus
{
    Open,
    InProgress,
    Resolved,
    Closed
}
```

### Background Jobs

Consider using Hangfire or similar for:
- Scheduled newsletter sending
- Email queue processing
- SMS queue processing
- Notification dispatch

## Acceptance Criteria

- [ ] Newsletter CRUD operations functional
- [ ] Newsletter sending working (async/queued)
- [ ] Subscription management working
- [ ] Ticket CRUD operations functional
- [ ] Ticket messaging working
- [ ] Ticket subscription/notification working
- [ ] SMS sending functional
- [ ] SMS broadcasting working
- [ ] Email templating system working
- [ ] Background job processing configured
- [ ] Unit tests written
- [ ] Integration tests for email/SMS (with mocks)
- [ ] Angular components implemented
- [ ] Rich text editor for newsletter/tickets

## Technical Notes

- Use queuing for email/SMS to avoid blocking
- Implement rate limiting for SMS to avoid costs
- Use email templates (e.g., Razor templates)
- Consider third-party services (SendGrid, Twilio)
- Implement proper error handling and retry logic
- Log all communications for audit trail
- GDPR compliance for subscriptions

## Labels

`backend`, `api`, `medium-priority`, `newsletter`, `ticketing`, `sms`, `email`, `communication`
