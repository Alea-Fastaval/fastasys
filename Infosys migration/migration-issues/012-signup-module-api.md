# Migration Issue: Signup Module & Public API

**Priority:** Medium-High
**Estimated Effort:** 8-13 story points (2-3 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup), #001 (Participant API)

## Description

Migrate the configurable signup module with dynamic forms and public-facing API from PHP to .NET. This is a critical public interface for convention signups.

## Current Implementation

**Controllers:**
- `SignupAdminController` - Admin interface for configuring signup
- `SignupApiController` - Public API for signup process

**Routes:**
- `signup/pages` - Manage signup pages
- `signup/config` - Configuration management
- `api/signup/*` - Public signup API endpoints

**Features:**
- Dynamic page creation
- Configurable form elements
- Multi-step signup process
- Food/activity/wear selection
- Signup submission and confirmation
- Load existing signups

## Target Implementation

### Admin API Controller

```csharp
[ApiController]
[Route("api/signup-admin")]
[Authorize(Policy = "SignupManagement")]
public class SignupAdminController : ControllerBase
{
    [HttpGet("pages")]
    public async Task<ActionResult<IEnumerable<SignupPageDto>>> GetPages()
    
    [HttpGet("pages/{id}")]
    public async Task<ActionResult<SignupPageDto>> GetPage(int id)
    
    [HttpPost("pages")]
    public async Task<ActionResult<SignupPageDto>> CreatePage([FromBody] CreateSignupPageDto dto)
    
    [HttpPut("pages/{id}")]
    public async Task<IActionResult> UpdatePage(int id, [FromBody] UpdateSignupPageDto dto)
    
    [HttpPost("pages/{id}/elements")]
    public async Task<ActionResult<PageElementDto>> AddElement(int id, [FromBody] AddElementDto dto)
    
    [HttpGet("config")]
    public async Task<ActionResult<IEnumerable<ConfigModuleDto>>> GetConfigs()
    
    [HttpGet("config/{module}")]
    public async Task<ActionResult<ConfigModuleDto>> GetConfig(string module)
    
    [HttpPut("config/{module}")]
    public async Task<IActionResult> UpdateConfig(string module, [FromBody] UpdateConfigDto dto)
}
```

### Public Signup API Controller

```csharp
[ApiController]
[Route("api/signup")]
[AllowAnonymous]  // Public signup API
public class SignupController : ControllerBase
{
    [HttpGet("config")]
    public async Task<ActionResult<SignupConfigDto>> GetConfig()
    
    [HttpGet("pages")]
    public async Task<ActionResult<IEnumerable<PageDto>>> GetPages()
    
    [HttpGet("pages/{id}")]
    public async Task<ActionResult<PageDto>> GetPage(int id)
    
    [HttpGet("food")]
    public async Task<ActionResult<IEnumerable<FoodOptionDto>>> GetFoodOptions()
    
    [HttpGet("activities")]
    public async Task<ActionResult<IEnumerable<ActivityOptionDto>>> GetActivities()
    
    [HttpGet("wear")]
    public async Task<ActionResult<IEnumerable<WearOptionDto>>> GetWearOptions()
    
    [HttpPost("submit")]
    public async Task<ActionResult<SignupResult>> SubmitSignup([FromBody] SignupSubmissionDto dto)
    
    [HttpPost("confirm")]
    public async Task<IActionResult> ConfirmSignup([FromBody] ConfirmSignupDto dto)
    
    [HttpPost("load")]
    public async Task<ActionResult<SignupDataDto>> LoadSignup([FromBody] LoadSignupDto dto)
}
```

### Entity Models

```csharp
public class SignupPage
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int OrderIndex { get; set; }
    public bool IsActive { get; set; }
    
    public virtual ICollection<SignupPageElement> Elements { get; set; }
}

public class SignupPageElement
{
    public int Id { get; set; }
    public int PageId { get; set; }
    public string ElementType { get; set; }  // text, textarea, select, checkbox, etc.
    public string Label { get; set; }
    public string Name { get; set; }
    public bool IsRequired { get; set; }
    public string ValidationRules { get; set; }
    public string Options { get; set; }  // JSON for select options
    public int OrderIndex { get; set; }
    
    public virtual SignupPage Page { get; set; }
}

public class SignupConfig
{
    public int Id { get; set; }
    public string Module { get; set; }
    public string ConfigKey { get; set; }
    public string ConfigValue { get; set; }
}

public class SignupSubmission
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string FormData { get; set; }  // JSON of all form data
    public DateTime SubmittedAt { get; set; }
    public bool IsConfirmed { get; set; }
    public string ConfirmationToken { get; set; }
    public int? ParticipantId { get; set; }  // After confirmation
    
    public virtual Participant Participant { get; set; }
}
```

### Services

```csharp
public interface ISignupService
{
    Task<SignupPage> GetPageAsync(int pageId);
    Task<SignupConfig> GetConfigAsync(string module);
    Task<SignupSubmission> SubmitSignupAsync(SignupSubmissionDto dto);
    Task ConfirmSignupAsync(string token);
    Task<SignupSubmission> LoadSignupAsync(string email, string token);
}
```

### Angular Public Signup App

Create separate Angular app for public signup:

```typescript
// signup-app/
//   /src
//     /app
//       /pages
//         - signup-form/
//         - confirmation/
//         - success/
//       /services
//         - signup.service.ts
//       /models
//         - signup.models.ts
```

**Features:**
- Multi-step form wizard
- Dynamic form generation based on page config
- Validation
- Progress indicator
- Save and resume functionality
- Confirmation email flow

## Acceptance Criteria

- [ ] Admin API for page management functional
- [ ] Admin API for config management functional
- [ ] Public API endpoints working
- [ ] Dynamic form generation working
- [ ] Multi-step signup flow functional
- [ ] Food/activity/wear selection working
- [ ] Submission and confirmation working
- [ ] Email confirmation flow working
- [ ] Save and resume working
- [ ] Unit tests written
- [ ] Integration tests for full signup flow
- [ ] Angular admin interface for configuration
- [ ] Angular public signup app
- [ ] Responsive design for mobile users
- [ ] Accessibility compliance

## Technical Notes

- Consider form builder library for admin interface
- Use reactive forms in Angular for validation
- Implement proper CSRF protection
- Add rate limiting to prevent abuse
- Consider CAPTCHA for spam prevention
- Store form data as JSON for flexibility
- Implement proper email confirmation flow
- GDPR compliance for data collection

## Labels

`backend`, `api`, `frontend`, `medium-priority`, `signup`, `public-api`, `forms`
