# Migration Issue: Database Schema & Entity Framework Setup

**Priority:** Critical
**Estimated Effort:** 5-8 story points (1-2 sprints)
**Dependencies:** None (must be done early)

## Description

Set up Entity Framework Core to work with existing MySQL database. Map all entities to existing tables without changing schema.

## Current Database

**Type:** MySQL 5.5/5.7
**Tables:** 50+ tables (estimated)
**Key tables:**
- deltagere (participants)
- aktiviteter (activities)
- afvikling (schedules)
- hold (groups)
- users
- roles
- privileges
- food types
- wear items
- entrance types
- boardgames
- ... many more

## Target Implementation

### Entity Framework Core Setup

```csharp
// Install packages
// Pomelo.EntityFrameworkCore.MySql
// Microsoft.EntityFrameworkCore.Design

public class InfosysDbContext : DbContext
{
    public InfosysDbContext(DbContextOptions<InfosysDbContext> options)
        : base(options) { }
    
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<Schedule> Schedules { get; set; }
    public DbSet<User> Users { get; set; }
    // ... all entities
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Map to existing table names (Danish)
        modelBuilder.Entity<Participant>().ToTable("deltagere");
        modelBuilder.Entity<Activity>().ToTable("aktiviteter");
        modelBuilder.Entity<Schedule>().ToTable("afvikling");
        
        // Configure relationships
        // Configure indexes
        // Configure constraints
    }
}
```

### Database Reverse Engineering

Use scaffolding to generate initial models:

```bash
dotnet ef dbcontext scaffold "Server=localhost;Database=infosys;User=root;Password=xxx" Pomelo.EntityFrameworkCore.MySql --output-dir Models/Generated
```

Then refactor and organize.

### Migration Strategy

Since we're keeping existing schema:
1. Create initial migration matching current state
2. Future changes via EF migrations
3. Maintain compatibility during transition

## Tasks

- [ ] Set up EF Core with Pomelo MySQL provider
- [ ] Map all existing tables to entities
- [ ] Configure relationships and navigation properties
- [ ] Set up DbContext with proper configuration
- [ ] Create repository pattern (if desired)
- [ ] Set up unit of work pattern (if desired)
- [ ] Add connection string management (secrets)
- [ ] Test CRUD operations on all entities
- [ ] Document any schema peculiarities
- [ ] Set up database seeding for development
- [ ] Create database utilities and helpers

## Acceptance Criteria

- [ ] All tables mapped to entities
- [ ] Relationships configured correctly
- [ ] CRUD operations work on all entities
- [ ] Queries perform adequately
- [ ] Connection pooling configured
- [ ] Database health checks implemented
- [ ] Development seed data available
- [ ] Documentation complete

## Technical Notes

- Use lazy loading carefully (performance)
- Configure proper index hints if needed
- Consider read replicas for reporting
- Set up proper connection string per environment
- Use migrations for any schema changes

## Labels

`backend`, `database`, `critical`, `infrastructure`

