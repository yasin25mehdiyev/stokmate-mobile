// mobile/.env(.example) ve EAS Environment Variables'ta (preview/production/
// development) tanımlıdır — varsayılan olarak Render'daki barındırılan
// API'ye işaret eder. Kendi yerel API'nize karşı geliştirme yapmak için
// yerel .env dosyanızda geçersiz kılabilirsiniz.
export const env = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL as string,
} as const;
