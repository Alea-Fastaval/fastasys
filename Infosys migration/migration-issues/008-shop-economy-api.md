# Migration Issue: Shop & Economy Management API

**Priority:** Medium
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** #002 (Authentication), #004 (Database Setup)

## Description

Migrate shop and economy tracking system from PHP to .NET. Includes product management, sales tracking, and statistics/graphs.

## Current Implementation

**Controller:** `ShopController` (include/controllers/shop_controller.php)
**Related:** `EconomyController` for financial reporting
**Routes:**
- `shop` - Overview
- `shop/parsedata` - Import from spreadsheet
- `shop/ajaxupdate` - Update product
- `shop/deleteproduct` - Delete product
- `shop/product-data/:id:` - Product statistics

## Target Implementation

### API Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class ShopController : ControllerBase
{
    [HttpGet("products")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
    
    [HttpGet("products/{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    
    [HttpPost("products")]
    [Authorize(Policy = "ShopManagement")]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto dto)
    
    [HttpPut("products/{id}")]
    [Authorize(Policy = "ShopManagement")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductDto dto)
    
    [HttpDelete("products/{id}")]
    [Authorize(Policy = "ShopManagement")]
    public async Task<IActionResult> DeleteProduct(int id)
    
    [HttpPost("products/import")]
    [Authorize(Policy = "ShopManagement")]
    public async Task<ActionResult<ImportResult>> ImportProducts([FromForm] IFormFile file)
    
    [HttpGet("products/{id}/statistics")]
    public async Task<ActionResult<ProductStatistics>> GetProductStats(int id)
    
    [HttpGet("sales")]
    public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales(
        [FromQuery] DateTime? startDate,
        [FromQuery] DateTime? endDate)
}
```

### Entity Models

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string Category { get; set; }
    public bool IsActive { get; set; }
    
    public virtual ICollection<Sale> Sales { get; set; }
}

public class Sale
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public int ParticipantId { get; set; }
    public int Quantity { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime SaleDate { get; set; }
    
    public virtual Product Product { get; set; }
    public virtual Participant Participant { get; set; }
}
```

### Services

- Product management service
- Sales tracking service
- Statistics calculation service
- Excel import/export service

## Acceptance Criteria

- [ ] Product CRUD operations functional
- [ ] Sales tracking working
- [ ] Statistics/graphs data endpoints working
- [ ] Excel import functional
- [ ] Inventory management working
- [ ] Unit tests written
- [ ] Angular shop management component
- [ ] Charts/graphs displaying correctly

## Labels

`backend`, `api`, `medium-priority`, `shop`, `economy`
