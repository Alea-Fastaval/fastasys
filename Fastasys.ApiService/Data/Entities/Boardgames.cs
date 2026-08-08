namespace Fastasys.ApiService.Data.Entities;

public class Boardgame
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public int? MinPlayers { get; set; }
    public int? MaxPlayers { get; set; }
    public int? PlayingTimeMinutes { get; set; }
    public string Barcode { get; set; } = string.Empty;
    public bool IsPresent { get; set; } = true;

    public virtual ICollection<BoardgameLoan> Loans { get; set; } = new List<BoardgameLoan>();
}

public class BoardgameLoan
{
    public int Id { get; set; }
    public int BoardgameId { get; set; }
    public virtual Boardgame Boardgame { get; set; } = null!;
    public int ParticipantId { get; set; }
    public virtual Participant Participant { get; set; } = null!;
    public DateTime LoanedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ReturnedAt { get; set; }
}

public class LoanItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TotalQuantity { get; set; }
    public int AvailableQuantity { get; set; }
}
