using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using StokMate.Api.Auth;
using StokMate.Api.Common;
using StokMate.Api.Data;
using StokMate.Api.Services;

const string corsPolicyName = "StokMateCors";

var builder = WebApplication.CreateBuilder(args);

// Port, ortam değişkeni PORT'tan (Render gibi hosting'lerin enjekte ettiği) alınır;
// yoksa yerel geliştirme için 5080'e düşer. Tüm ağ arayüzleri (0.0.0.0) dinlenir;
// böylece API'ye hem localhost'tan hem de emülatör/fiziksel cihazdan makinenin
// yerel IP'si ile erişilebilir.
var port = Environment.GetEnvironmentVariable("PORT") ?? "5080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Bellek içi veritabanı: kurulum gerektirmez, uygulama kapanınca veriler silinir.
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("StokMate"));

// Erişim anahtarları süreç belleğinde tutulur; bu yüzden tek örnek olmalı.
builder.Services.AddSingleton<TokenService>();

// Servisler arayüzsüz, somut sınıf olarak kaydedilir.
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<LookupService>();

builder.Services.AddControllers();

// Model bağlama hataları da düz metin dönsün. AddControllers()'tan SONRA gelmeli ki
// varsayılan ProblemDetails (JSON) üreticisinin üzerine yazsın.
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = _ => new ContentResult
    {
        StatusCode = StatusCodes.Status400BadRequest,
        ContentType = "text/plain; charset=utf-8",
        Content = "İstek geçersiz veya eksik alan içeriyor."
    };
});

// Yenileme anahtarı artık HttpOnly cookie ile taşınıyor; CORS spesifikasyonu credentials'lı
// isteklerde joker (*) origin'e izin vermez, bu yüzden yalnızca localhost (herhangi bir port)
// kaynaklarına izin veriyoruz.
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy => policy
        .SetIsOriginAllowed(origin => new Uri(origin).IsLoopback)
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "StokMate API",
        Version = "v1",
        Description = "Stok yönetimi case study API'si. Fiyat alanları KURUŞ cinsindendir (1999 = 19,99 TL)."
    });

    // Swagger arayüzündeki "Authorize" düğmesi için opak Bearer anahtarı tanımı.
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        In = ParameterLocation.Header,
        Description = "/auth/login yanıtındaki accessToken değerini girin."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });

    // Controller'lardaki XML özet yorumları Swagger'da açıklama olarak görünür.
    var xmlPath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.xml");
    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
});

var app = builder.Build();

// Örnek veriler uygulama açılışında yüklenir.
using (var scope = app.Services.CreateScope())
{
    DbSeeder.Seed(scope.ServiceProvider.GetRequiredService<AppDbContext>());
}

// En dışta: alttaki tüm hataları düz metin yanıta çevirir.
app.UseMiddleware<ExceptionMiddleware>();

app.UseSwagger();
app.UseSwaggerUI();

app.UseRouting();
app.UseCors(corsPolicyName);
app.MapControllers();

app.Run();
