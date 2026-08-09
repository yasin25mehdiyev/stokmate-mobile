using Microsoft.AspNetCore.Mvc;
using StokMate.Api.Auth;
using StokMate.Api.Models;
using StokMate.Api.Services;

namespace StokMate.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly IWebHostEnvironment _env;

    public AuthController(AuthService authService, IWebHostEnvironment env)
    {
        _authService = authService;
        _env = env;
    }

    /// <summary>E-posta ve şifre ile giriş yapar, anahtar çifti döner.</summary>
    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
    {
        var response = await _authService.LoginAsync(request);
        SetRefreshTokenCookie(response.RefreshToken);
        return response;
    }

    /// <summary>Yenileme anahtarını yeni bir anahtar çiftiyle değiştirir.</summary>
    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResponse>> Refresh([FromBody] RefreshRequest request)
    {
        // Web istemcisi anahtarı cookie ile otomatik gönderir; mobil istemci
        // (cookie jar'ı olmadığı için) body üzerinden taşır. Cookie önceliklidir.
        request.RefreshToken = Request.Cookies["refreshToken"] ?? request.RefreshToken;

        var response = await _authService.RefreshAsync(request);
        SetRefreshTokenCookie(response.RefreshToken);
        return response;
    }

    /// <summary>Oturumu kapatır ve yenileme anahtarını iptal eder.</summary>
    [BearerAuth]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
        var refreshToken = Request.Cookies["refreshToken"] ?? request.RefreshToken;
        await _authService.LogoutAsync(refreshToken, HttpContext.GetUserId());
        Response.Cookies.Delete("refreshToken", new CookieOptions { Path = "/auth" });
        return NoContent();
    }

    /// <summary>Oturum açmış kullanıcının bilgilerini döner.</summary>
    [BearerAuth]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
        => await _authService.GetMeAsync(HttpContext.GetUserId());
    
    /// <summary>Yenileme anahtarını yalnızca /auth altındaki uçlara giden, JS'in erişemediği bir cookie olarak yazar.</summary>
    private void SetRefreshTokenCookie(string refreshToken)
    {
        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = !_env.IsDevelopment(),
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.Add(AuthService.RefreshTokenLifetime),
            Path = "/auth",
        });
    }
}
