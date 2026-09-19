namespace Fastasys.ApiService.Data.Entities;

public class SignupPage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public bool IsActive { get; set; } = true;

    public virtual ICollection<SignupPageElement> Elements { get; set; } = new List<SignupPageElement>();
}

public class SignupPageElement
{
    public int Id { get; set; }
    public int PageId { get; set; }
    public virtual SignupPage Page { get; set; } = null!;
    public string ElementType { get; set; } = "text"; // text, select, checkbox, textarea
    public string Label { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool IsRequired { get; set; }
    public string? ValidationRules { get; set; }
    public string? OptionsJson { get; set; }
    public int OrderIndex { get; set; }
}

public class SignupConfig
{
    public int Id { get; set; }
    public string Module { get; set; } = string.Empty;
    public string ConfigKey { get; set; } = string.Empty;
    public string ConfigValue { get; set; } = string.Empty;
}

public class SignupSubmission
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FormDataJson { get; set; } = "{}";
    public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    public bool IsConfirmed { get; set; }
    public string ConfirmationToken { get; set; } = Guid.NewGuid().ToString();
    public int? ParticipantId { get; set; }
    public virtual Participant? Participant { get; set; }
}
