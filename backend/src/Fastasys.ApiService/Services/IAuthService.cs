namespace Fastasys.ApiService.Services;

public record LoginDto(string Username, string Password);

public record AuthResponseDto(
    string Token,
    string RefreshToken,
    DateTime ExpiresAt,
    UserInfoDto User
);

public record UserInfoDto(
    int Id,
    string Username,
    string Email,
    string FirstName,
    string LastName,
    IEnumerable<string> Roles,
    IEnumerable<string> Privileges
);

public record RefreshTokenDto(string Token, string RefreshToken);

public record ResetPasswordDto(string Email);

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<AuthResponseDto?> RefreshTokenAsync(RefreshTokenDto dto);
    Task<bool> ResetPasswordRequestAsync(ResetPasswordDto dto);
}
