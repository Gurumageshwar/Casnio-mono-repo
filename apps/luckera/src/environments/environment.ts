import { AppEnvironment } from '@casino/shared-models';

export const environment: AppEnvironment = {
  production: false,
  apiUrl: 'https://api.luckera.com',
  brand: 'luckera',
  defaultLocale: 'en',
  supportedLocales: ['en']
};
