export const COMMON_ICONS = {
  LOGO: 'logo',
  BRAND_LOGO: 'brand-logo',

  HOME: 'home',
  MENU: 'menu',
  CLOSE: 'close',

  SEARCH: 'search',

  USER: 'user',
  PROFILE: 'profile',

  WALLET: 'wallet',
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',

  SUCCESS: 'success',
  ERROR: 'error',

  CHECK: 'check'
} as const;

export type CommonIcon = typeof COMMON_ICONS[keyof typeof COMMON_ICONS];
