# StokMate — Mobile (React Native / Expo)

StokMate'in mağaza personeli için mobil uygulaması. Aynı .NET API'yi web panelle paylaşır;
mobil tarafın odak noktası **ürün arama + detay + sahada stok güncelleme**dir.

```
mobile/
  app-root/    → Expo Router route dosyaları (ekran yönlendirme)
  src/
    app/       → FSD "app" katmanı: axios instance + interceptor'lar, TanStack Query provider'ları
    entities/  → Domain veri modelleri + query hook'ları (products, profile, lookups)
    features/  → Kullanıcı aksiyonları (signin, logout, product-list, product-filter,
                 product-view, stock-update)
    screens/   → FSD "pages" katmanı — RN'de yaygın adıyla "screens"
    widgets/   → Birden fazla feature'ı birleştiren kompozit UI (profile-menu, product-stats)
    shared/    → UI kit, api client, i18n, config, yardımcı fonksiyonlar
```

## Hızlı Başlangıç

**1. API'yi ayağa kaldırın** (`server/`, port `5080`):

```bash
cd server
dotnet run --project src/StokMate.Api
```

**2. Bağımlılıkları kurun:**

```bash
cd mobile
npm install
```

**3. `.env` dosyası** — `npm start` ilk çalıştığında `.env.example`'dan otomatik
oluşturulur (`scripts/ensure-env.mjs`, `prestart` hook'u). Elle bir şey yapmanıza
gerek yok; `EXPO_PUBLIC_API_BASE_URL` boş bırakılırsa uygulama Metro'nun bağlı
olduğu makinenin LAN IP'sini otomatik türetir (`shared/config/env.ts`) — fiziksel
cihazla test ederken elle IP aramaya gerek kalmaz. Android emülatörü kullanıyorsanız
`.env` içinde `EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:5080` set edin.

**4. Geliştirme build'i çalıştırın:**

Bu proje **Expo Go ile çalışmaz** — SDK 57'nin dev-tooling'i Expo Go'nun mağaza
sürümünden daha yeni olabiliyor. Bunun yerine kendi development client'ımızı kullanıyoruz:

```bash
npx eas-cli build --profile development --platform android
```

(Ücretsiz bir expo.dev hesabı gerektirir — `npx eas-cli login`.) Build bitince linkten
APK'yı telefona kurun, sonra:

```bash
npm start
```

ile Metro'yu başlatıp uygulamayı açın; QR kodu okutmanıza gerek yok, dev client
otomatik bağlanır.

**5. Teslim edilecek APK için** (standalone, Metro'ya bağımlı değil):

```bash
npx eas-cli build --profile preview --platform android
```

## Varsayımlar

- **Bonus özellik (canlı senkronizasyon) mobilde yok** — görev tanımına göre bu web'e
  özgü bonus, mobilin karşılığı zaten stok güncellemenin kendisi.
- **Dashboard/istatistik sayfası ayrı bir ekran olarak eklenmedi** — mobil kullanıcı
  (saha personeli) için ayrı bir gezinme adımı eklemek yerine, en değerli kısmı
  (toplam/kritik/tükenen sayaçları) ürün listesinin üstüne kompakt bir şerit olarak
  taşındı.
- **Kategori/marka filtresi mobile'e eklendi** — görev metni mobil için yalnızca aramayı
  zorunlu kılıyor, ancak "web'deki tüm özellikler mobilde de olsun" isteği doğrultusunda
  filtre de eklendi (bottom sheet olarak, tek seçim + "Uygula").
- **Dil değiştirici + tarih rozeti mobile taşındı** — web header'ındaki bu iki öğe,
  mobilde header alanı dar olduğundan profil avatarına toplanan tek bir bottom sheet'e
  (dil seçimi + çıkış) birleştirildi.
- **Tek tema (light)** — web'de dark mode altyapısı var ama varsayılan/aktif tema light;
  mobil de aynı şekilde yalnızca light tema ile teslim edildi.
- **`refreshToken` istemciye hiç dönmüyor** (`AuthResponse.RefreshToken` sunucuda
  `[JsonIgnore]`), yalnızca `HttpOnly` cookie olarak set ediliyor. Bu yüzden mobil de
  web ile aynı şekilde `withCredentials: true` ile native cookie jar'a güveniyor —
  React Native'in networking katmanı (Android'de OkHttp, iOS'ta NSURLSession) cookie'leri
  tarayıcıya benzer şekilde otomatik saklayıp gönderiyor.

## Kütüphane Seçimleri

| Kütüphane | Neden |
| --- | --- |
| **Expo (managed) + expo-router** | Native tooling kurmadan (Android Studio/Xcode) geliştirme; dosya tabanlı, tip-güvenli routing — React Navigation'ı elle kurmaktan daha az boilerplate. |
| **NativeWind** | Web client zaten Tailwind kullanıyor; aynı tasarım token'larını (`brand`, `wash`, `ink`...) birebir aynı sözdizimiyle mobile taşımak için. |
| **TanStack Query** | Web ile aynı — sunucu state cache/invalidation. `keepPreviousData` ile arama/filtre değişiminde liste "yanıp sönmüyor". |
| **Zustand** | Web ile aynı — yalnızca `isAuthenticated` gibi küçük global state için, RN'de async hydration (SecureStore) destekleyecek şekilde genişletildi. |
| **Axios + Orval** | Web ile aynı codegen zinciri — aynı `swagger.json`'dan tip-güvenli hook'lar üretiliyor, backend değişince iki taraf da aynı komutla senkronize kalıyor. |
| **react-hook-form + zod** | Web ile aynı; giriş formunda kullanılıyor. Stok güncelleme tek alanlı bir stepper olduğu için orada bilinçli olarak kullanılmadı (gereksiz katman olurdu). |
| **expo-secure-store** | Access token'ı native keychain/keystore'da şifreli saklamak için — web'in cookie'sine RN karşılığı. |
| **@gorhom/bottom-sheet** | Filtre ve profil menüsü için — mobilde dropdown yerine native, dokunmaya uygun standart pattern. |
| **react-i18next** | Web ile aynı kütüphane; `tr/en/ru` çevirileri aynı yapıda taşındı. |
| **lucide-react-native** | Web'de `lucide-react` kullanılıyor; aynı ikon setinin RN portu. |

## Bilinen Sınırlamalar

- Geliştirme sırasında Metro'ya bağlı `development` build kullanılır (büyük, yavaş
  başlar — bu normaldir). Teslim edilen `preview` APK tamamen standalone'dur, Metro
  gerektirmez ve önemli ölçüde daha küçük/hızlıdır (ABI `arm64-v8a` ile sınırlandırıldı,
  Proguard/resource shrink aktif).
- Yalnızca Android hedeflendi (görev APK istiyor); iOS build'i denenmedi.
