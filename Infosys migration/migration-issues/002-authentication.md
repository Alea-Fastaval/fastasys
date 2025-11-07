# Migration Issue: Authentication & Authorization System

**Priority:** Critical
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** None (must be done first)

## Description

Migrate authentication and authorization from PHP session-based to .NET with JWT tokens for API access and cookie-based auth for web.

## Current Implementation

**Controller:** `IndexController` (login/logout methods)
**Session-based:** PHP sessions with role/privilege checks
**Database Tables:** `users`, `roles`, `privileges`

## Target Implementation

### .NET Identity

Use ASP.NET Core Identity with custom user model:

```csharp
public class ApplicationUser : IdentityUser<int>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // Map to existing 'users' table
}
```

### JWT for API

Implement JWT token generation and validation:

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginDto dto)
    
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenDto dto)
    
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
}
```

### Role-Based Authorization

Implement custom authorization policies:

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("ParticipantManagement", policy =>
        policy.RequireRole("Admin", "ParticipantManager"));
    options.AddPolicy("ActivityManagement", policy =>
        policy.RequireRole("Admin", "ActivityManager"));
    // ... etc
});
```

### Password Reset Flow

Implement password reset with token-based verification:
- Generate secure reset tokens
- Send email with reset link
- Validate and reset password

## Acceptance Criteria

- [ ] Login endpoint functional
- [ ] JWT token generation working
- [ ] Token refresh mechanism implemented
- [ ] Role-based authorization working
- [ ] Password reset flow complete
- [ ] User registration (if needed)
- [ ] Session migration strategy defined
- [ ] Angular auth service implemented
- [ ] Auth guard for protected routes
- [ ] Secure token storage (HttpOnly cookies or secure storage)
- [ ] Unit tests for auth logic
- [ ] Security audit passed

## Technical Notes

- Use secure password hashing (existing: check PHP implementation)
- Implement token rotation for security
- Add rate limiting for login attempts
- Consider 2FA for admin accounts
- Implement proper CORS configuration

## Labels

`backend`, `api`, `critical`, `security`, `authentication`

