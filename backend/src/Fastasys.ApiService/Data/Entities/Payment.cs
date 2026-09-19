namespace Fastasys.ApiService.Data.Entities;

public enum PaymentStatus
{
    Pending = 0,
    Completed = 1,
    Failed = 2,
    Cancelled = 3,
    Refunded = 4
}

public class Payment
{
    public int Id { get; set; }
    public int ParticipantId { get; set; }
    public virtual Participant Participant { get; set; } = null!;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "DKK";
    public string TransactionId { get; set; } = string.Empty;
    public PaymentStatus Status { get; set; } = PaymentStatus.Pending;
    public string PaymentProvider { get; set; } = "fritid.dk";
    public string? CallbackData { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
}
