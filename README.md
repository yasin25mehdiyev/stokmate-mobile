# StokMate

Stok yönetimi case study'si. Repo iki bağımsız projeden oluşur:

```
stokmate-mobile/
├── server/   → .NET 8 Web API (InMemory veritabanı, JWT + refresh token auth)
└── mobile/   → React Native + TypeScript (Expo) mağaza personeli uygulaması
```

İkisi de ayrı ayrı çalıştırılır ve HTTP üzerinden haberleşir.

## Hızlı Başlangıç

**1. API** (`server/`, port `5080`):

```bash
cd server
dotnet run --project src/StokMate.Api
```

**2. Mobil uygulama** (`mobile/`):

```bash
cd mobile
npm install
npm start
```

Uygulamanın API'yi bulabilmesi için `mobile/.env` içinde `EXPO_PUBLIC_API_BASE_URL`
tanımlı olmalı — bu dosya `npm start` ilk çalıştığında `.env.example`'dan otomatik
oluşturulur. Detaylar için [`mobile/README.md`](mobile/README.md) dosyasına bakın;
endpoint referansı için [`server/API.md`](server/API.md).

## APK ile Test (EAS Preview Build)

Paylaşılan `.apk` dosyası (veya EAS build linki) derleme sırasında sabit bir API
adresi içermez; uygulama açıldığında varsayılan olarak `http://localhost:5080`
adresine bağlanmayı dener. Fiziksel bir telefonda "localhost" telefonun kendisi
demek olduğundan, API'yi kendi bilgisayarınızda ayağa kaldırmanız tek başına
yeterli değildir. APK'yı test etmek için:

1. **API'yi kendi makinenizde çalıştırın** (`server/`, port `5080` — yukarıdaki
   "Hızlı Başlangıç" adımı).
2. **Telefon ile bilgisayarın aynı Wi-Fi/LAN ağında** olduğundan emin olun.
3. Uygulamayı açın, giriş ekranındaki **"Server Settings"** düğmesine dokunun ve
   bilgisayarınızın LAN IP adresini girin (örn. `http://192.168.1.34:5080`) —
   bu ekran tam olarak bu senaryo için var
   (`mobile/src/features/auth/server-settings`).

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
