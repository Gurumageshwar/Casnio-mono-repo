// ─────────────────────────────────────────────
// Shared Casino Domain Models
// ─────────────────────────────────────────────

export interface CasinoGame {
  id: string;
  name: string;
  provider: string;
  category: string;
  thumbnailUrl: string;
  isLive: boolean;
  isFavorite: boolean;
  tags: string[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  expiresAt: string;
  type: 'bonus' | 'freespins' | 'cashback' | 'tournament';
}

export interface LoyaltyTier {
  id: string;
  name: string;
  level: number;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
  iconUrl: string;
}

export interface PlayerBalance {
  currency: string;
  real: number;
  bonus: number;
  total: number;
}

export interface Tournament {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  prizePool: number;
  currency: string;
  players: number;
}

export interface AppEnvironment {
  production: boolean;
  apiUrl: string;
  brand: string;
  defaultLocale: string;
  supportedLocales: string[];
  firebaseConfig?: Record<string, string>;
}
