using System.ComponentModel.DataAnnotations.Schema;

namespace Fastasys.ApiService.Data.Entities;

[Table("users")]
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

[Table("roles")]
public class Role
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public virtual ICollection<RolePrivilege> RolePrivileges { get; set; } = new List<RolePrivilege>();
}

[Table("privileges")]
public class Privilege
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;

    public virtual ICollection<RolePrivilege> RolePrivileges { get; set; } = new List<RolePrivilege>();
}

[Table("user_roles")]
public class UserRole
{
    public int UserId { get; set; }
    public virtual User User { get; set; } = null!;
    public int RoleId { get; set; }
    public virtual Role Role { get; set; } = null!;
}

[Table("role_privileges")]
public class RolePrivilege
{
    public int RoleId { get; set; }
    public virtual Role Role { get; set; } = null!;
    public int PrivilegeId { get; set; }
    public virtual Privilege Privilege { get; set; } = null!;
}
