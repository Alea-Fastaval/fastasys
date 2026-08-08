# Migration Issue: Payment Integration (fritid.dk)

**Priority:** High
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** #002 (Authentication), #001 (Participant API)

## Description

Migrate payment integration with fritid.dk payment provider from PHP to .NET. Handle payment creation, callbacks, status tracking.

## Current Implementation

**Controller:** `PaymentController` (include/controllers/payment_controller.php)
**Routes:**
- `payment/callback` - Payment gateway callback
- `payment/createurl` - Generate payment URL
- `payment/status` - Check payment status
- `payment/cancel` - Cancel payment
- `payment/create` - Initiate payment

**Framework classes:**
- `PaymentFactory`
- `PaymentFritidDkApi`
- `PaymentFritidDkLink`
- `PaymentFritidDkUrl`

## Target Implementation

### Service Layer

```csharp
public interface IPaymentService
{
    Task<PaymentUrlResponse> CreatePaymentUrl(CreatePaymentRequest request);
    Task<PaymentStatus> GetPaymentStatus(string transactionId);
    Task HandleCallback(PaymentCallbackDto callback);
    Task CancelPayment(string transactionId);
}

public class FritidDkPaymentService : IPaymentService
{
    // Implement fritid.dk integration
}
```

### Controller

```csharp
[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<PaymentUrlResponse>> CreatePayment([FromBody] CreatePaymentRequest request)
    
    [HttpPost("callback")]
    [AllowAnonymous]  // Callback from external system
    public async Task<IActionResult> PaymentCallback([FromBody] PaymentCallbackDto callback)
    
    [HttpGet("{transactionId}/status")]
    [Authorize]
    public async Task<ActionResult<PaymentStatus>> GetStatus(string transactionId)
    
    [HttpPost("{transactionId}/cancel")]
    [Authorize]
    public async Task<IActionResult> Cancel(string transactionId)
}
```

### Database Entity

```csharp
public class Payment
{
    public int Id { get; set; }
    public int ParticipantId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; }
    public string TransactionId { get; set; }
    public PaymentStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string CallbackData { get; set; }
    
    public virtual Participant Participant { get; set; }
}

public enum PaymentStatus
{
    Pending,
    Completed,
    Failed,
    Cancelled,
    Refunded
}
```

## Security Considerations

- [ ] Verify callback signatures from payment provider
- [ ] Use HTTPS for all payment operations
- [ ] Store minimal payment data (PCI compliance)
- [ ] Log all payment operations
- [ ] Implement idempotency for callbacks
- [ ] Rate limiting on payment endpoints

## Acceptance Criteria

- [ ] Payment URL generation working
- [ ] Callback handling functional
- [ ] Payment status tracking working
- [ ] Cancellation working
- [ ] Proper error handling
- [ ] Security measures implemented
- [ ] Logging complete
- [ ] Unit tests written
- [ ] Integration tests with mock provider
- [ ] Angular payment component working
- [ ] Documentation complete

## Technical Notes

- Test with fritid.dk sandbox environment
- Implement retry logic for API calls
- Handle webhook failures gracefully
- Consider payment reconciliation job
- Document API keys and secrets management

## Labels

`backend`, `api`, `high-priority`, `payment`, `integration`, `security`

