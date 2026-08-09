# StokMate

📱 **[APK'yı indir](https://expo.dev/artifacts/eas/zVa-p2YYyGUwu7LdmPzMuTt7yjC-032-IWJ7_XIV2jg.apk)** — kurulum notları için aşağıdaki [APK ile Test](#apk-ile-test) bölümüne bakın. (EAS build artifact linkleri belirli bir süre sonra sona erer; link çalışmazsa haber verin, yeni build alınır.)

Stok yönetimi case study'si. Repo iki bağımsız projeden oluşur:

```
stokmate-mobile/
├── server/   → .NET 8 Web API (InMemory veritabanı, JWT + refresh token auth)
└── mobile/   → React Native + TypeScript (Expo) mağaza personeli uygulaması
```

İkisi de ayrı ayrı çalıştırılır ve HTTP üzerinden haberleşir.

## API: Barındırılan Adres

API, Render'ın ücretsiz katmanında barındırılıyor ve mobil uygulama varsayılan
olarak buraya bağlanır:

**https://stokmate-api.onrender.com** (Swagger: `/swagger/index.html`)

Deploy konfigürasyonu repoda: [`server/Dockerfile`](server/Dockerfile) ve
[`render.yaml`](render.yaml). Serverin kendi makinenizde ayrıca çalıştırılmasına
**gerek yoktur** — hem `npm start` ile geliştirme hem de dağıtılan APK bu adresi
kullanır.

> ⚠️ **İlk istekte gecikme olabilir.** Ücretsiz Render instance'ı 15 dakika
> hareketsizlikten sonra uykuya geçer; uyandırma ~30-50 saniye sürebilir. İlk
> giriş denemesi biraz uzun sürerse normaldir, sayfayı kapatıp tekrar denemeye
> gerek yoktur.

Kendi yerel API'nize (`server/`, `dotnet run --project src/StokMate.Api`, port
`5080`) karşı geliştirme yapmak isterseniz, `mobile/.env` içindeki
`EXPO_PUBLIC_API_BASE_URL`'i kendi adresinizle değiştirin — detaylar için
[`mobile/README.md`](mobile/README.md); endpoint referansı için
[`server/API.md`](server/API.md).

## Mobil Uygulamayı Çalıştırma

```bash
cd mobile
npm install
npm start
```

`.env` dosyası ilk çalıştırmada otomatik oluşturulur ve varsayılan olarak
barındırılan API'ye işaret eder — elle bir ayar yapmanız gerekmez.

## APK ile Test

Paylaşılan `.apk` dosyası derleme zamanında barındırılan API adresiyle
build edildiği için **hiçbir ek kuruluma gerek yoktur**: server'ı çalıştırmanıza,
aynı Wi-Fi ağında olmanıza veya uygulama içinde bir adres girmenize gerek yok.
APK'yı indirip kurduğunuz gibi doğrudan giriş yapabilirsiniz (test hesabı için
[`server/API.md`](server/API.md) dosyasına bakın). Yukarıdaki "ilk istekte
gecikme" notunu unutmayın.

## Auth Akışı: Access Token + HttpOnly Refresh Cookie

Mobil uygulama ile API arasındaki oturum yönetimi şu şekilde çalışır:

- **Access token** kısa ömürlüdür, API yanıt gövdesinde döner ve client tarafında
  (`shared/lib/token-storage`, `expo-secure-store` ile) saklanıp her isteğe
  `Authorization: Bearer` header'ı olarak eklenir
  (`src/app/axios/interceptors/request.interceptor.ts`).
- **Refresh token** response body'de hiç dönmez (`AuthResponse.RefreshToken` sunucuda
  `[JsonIgnore]`); `AuthController` içindeki `SetRefreshTokenCookie` tarafından
  yalnızca `/auth` altındaki endpoint'lere giden, `HttpOnly` + `SameSite=Lax` bir
  cookie olarak set edilir (`login`, `refresh` ve `logout` bu mekanizmayı kullanır).
  JavaScript bu cookie'ye erişemez; React Native'in native networking katmanı
  (Android'de OkHttp, iOS'ta NSURLSession) isteklerle birlikte otomatik gönderir —
  bunun için axios instance'ı `withCredentials: true` ile konfigüre edilmiştir
  (`shared/api/instance.ts`, `src/app/axios/refresh-token.ts`).
- Access token süresi dolmadan **~15 saniye önce** proaktif olarak yenilenir
  (`src/app/axios/proactive-refresh.ts`); ayrıca 401 alan herhangi bir istek de
  response interceptor tarafından otomatik retry edilir.
- `POST /auth/refresh`'te sunucu, cookie yoksa body üzerinden gelen `refreshToken`'ı
  da kabul eder (`Request.Cookies["refreshToken"] ?? request.RefreshToken`) — ancak
  `RefreshToken` hiçbir zaman body'de dönmediğinden bu yol yalnızca teoriktir; fiili
  akış tamamen cookie'ye dayanır.
- CORS, credentials'lı (cookie taşıyan) isteklerde wildcard (`*`) origin'e izin
  vermediğinden, `Program.cs` yalnızca loopback origin'lerine (`localhost`, herhangi
  bir port) `AllowCredentials()` ile izin verir.

## Backend Güncellemeleri

Ürün ve kullanıcı modellerine, uygulamanın ihtiyaç duyduğu alanlar eklendi; entity →
DTO → service → seed verisi zincirinin tamamı buna göre güncellendi:

- **`Product`** (`Data/Entities.cs`) — `BrandId`, `SupplierId`, `CostPrice`, `Description`
  alanları eklendi. `ProductService.GetListAsync` artık ürünleri `Brand` ve `Supplier`
  ile birlikte `Include` ederek okuyor; bu dört alan `ProductDto`'da da mevcut, yani
  `GET /products` (liste) yanıtında da dönüyor — önceden yalnızca `GET /products/{id}`
  ile alınabiliyordu.
- **`GET /products/{id}`** — tek bir ürünün tüm alanlarını dönen yeni endpoint
  (`ProductsController.GetById` → `ProductService.GetByIdAsync`).
- **`User`** (`Data/Entities.cs`) ve **`UserDto`** (`Models/AuthDtos.cs`) — `ImageUrl`
  alanı eklendi; `AuthService.ToDto` bunu artık `/auth/login`, `/auth/refresh` ve
  `/auth/me` yanıtlarına dahil ediyor.
- **`DbSeeder`** — test kullanıcısına bir `ImageUrl` (pravatar) atandı; `ProductRows`
  seed dizisindeki her satıra `BrandId`, `SupplierId`, `CostPrice` değerleri ve
  türetilmiş bir `Description` eklendi.
- **Refresh token → HttpOnly cookie** — refresh token artık response body'de
  dönmüyor; `AuthController` içindeki `SetRefreshTokenCookie` tarafından yalnızca
  `/auth` altındaki endpoint'lere giden, `HttpOnly` + `SameSite=Lax` bir cookie
  olarak set ediliyor (detaylar için yukarıdaki "Auth Akışı" bölümüne bakın).
