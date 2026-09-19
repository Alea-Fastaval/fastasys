namespace Fastasys.ApiService.Data.Entities;

public class HeroForceCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ColorHex { get; set; } = string.Empty;

    public virtual ICollection<HeroForceShift> Shifts { get; set; } = new List<HeroForceShift>();
}

public class HeroForceShift
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public int MaxParticipants { get; set; }

    public virtual HeroForceCategory Category { get; set; } = null!;
    public virtual ICollection<HeroForceShiftParticipant> Participants { get; set; } = new List<HeroForceShiftParticipant>();
}

public class HeroForceShiftParticipant
{
    public int Id { get; set; }
    public int ShiftId { get; set; }
    public int ParticipantId { get; set; }
    public DateTime SignedUpAt { get; set; }

    public virtual HeroForceShift Shift { get; set; } = null!;
}
