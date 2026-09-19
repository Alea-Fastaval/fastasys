namespace Fastasys.ApiService.Data.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}

public class Sale
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public virtual Product Product { get; set; } = null!;
    public int? ParticipantId { get; set; }
    public virtual Participant? Participant { get; set; }
    public int Quantity { get; set; } = 1;
    public decimal TotalAmount { get; set; }
    public DateTime SaleDate { get; set; } = DateTime.UtcNow;
}
