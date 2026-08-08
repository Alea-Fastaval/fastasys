using Fastasys.ApiService.Data;
using Fastasys.ApiService.Data.Entities;
using Fastasys.ApiService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fastasys.ApiService.Controllers;

public record CreateNewsletterDto(string Subject, string Body);
public record CreateTicketDto(string Title, string Description, int UserId);
public record AddTicketMessageDto(int UserId, string Content);

[ApiController]
[Route("api/[controller]")]
public class NewslettersController : ControllerBase
{
    private readonly InfosysDbContext _db;
    public NewslettersController(InfosysDbContext db) => _db = db;

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetNewsletters()
    {
        var items = await _db.Newsletters.AsNoTracking().ToListAsync();
        return Ok(items);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateNewsletter([FromBody] CreateNewsletterDto dto)
    {
        var newsletter = new Newsletter
        {
            Subject = dto.Subject,
            Body = dto.Body,
            CreatedAt = DateTime.UtcNow,
            SentAt = DateTime.UtcNow,
            RecipientCount = await _db.Participants.CountAsync()
        };

        _db.Newsletters.Add(newsletter);
        await _db.SaveChangesAsync();
        return Ok(newsletter);
    }
}

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
    private readonly InfosysDbContext _db;
    public TicketsController(InfosysDbContext db) => _db = db;

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetTickets()
    {
        var tickets = await _db.Tickets
            .Include(t => t.CreatedBy)
            .AsNoTracking()
            .Select(t => new { t.Id, t.Title, t.Description, Status = t.Status.ToString(), CreatedBy = t.CreatedBy.Username, t.CreatedAt })
            .ToListAsync();
        return Ok(tickets);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateTicket([FromBody] CreateTicketDto dto)
    {
        var user = await _db.Users.FindAsync(dto.UserId);
        if (user == null) return NotFound(new { message = "User not found" });

        var ticket = new Ticket
        {
            Title = dto.Title,
            Description = dto.Description,
            CreatedById = dto.UserId,
            Status = TicketStatus.Open,
            CreatedAt = DateTime.UtcNow
        };

        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return Ok(new { ticket.Id, ticket.Title, ticket.Description, Status = ticket.Status.ToString(), CreatedBy = user.Username, ticket.CreatedAt });
    }

    [HttpPost("{id:int}/messages")]
    [Authorize]
    public async Task<IActionResult> AddMessage(int id, [FromBody] AddTicketMessageDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(id);
        if (ticket == null) return NotFound(new { message = "Ticket not found" });

        var msg = new TicketMessage
        {
            TicketId = id,
            UserId = dto.UserId,
            Content = dto.Content,
            CreatedAt = DateTime.UtcNow
        };

        _db.TicketMessages.Add(msg);
        await _db.SaveChangesAsync();

        return Ok(new { message = "Message added to ticket" });
    }
}

public record SendEmailDto(string RecipientEmail, string Subject, string Body);
public record SendSmsDto(string PhoneNumber, string Text);

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly IMockNotificationService _notificationService;

    public NotificationsController(IMockNotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost("email")]
    [Authorize]
    public async Task<IActionResult> SendEmail([FromBody] SendEmailDto dto)
    {
        await _notificationService.SendEmailAsync(dto.RecipientEmail, dto.Subject, dto.Body);
        return Ok(new { message = "Email dispatched via Mock Notification Service" });
    }

    [HttpPost("sms")]
    [Authorize]
    public async Task<IActionResult> SendSms([FromBody] SendSmsDto dto)
    {
        await _notificationService.SendSmsAsync(dto.PhoneNumber, dto.Text);
        return Ok(new { message = "SMS dispatched via Mock Notification Service" });
    }

    [HttpGet("emails")]
    [Authorize]
    public IActionResult GetSentEmails()
    {
        return Ok(_notificationService.GetSentEmails());
    }

    [HttpGet("sms")]
    [Authorize]
    public IActionResult GetSentSms()
    {
        return Ok(_notificationService.GetSentSms());
    }
}
