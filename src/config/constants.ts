export const APP_CONFIG = {
  name: 'Mansio',
  description: 'Immersive Real Estate Discovery Platform',
  version: '1.0.0',
};

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
};

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAILS: '/property/:id',
  AUCTIONS: '/auctions',
  BROKERS: '/brokers',
  MARKET_ANALYSIS: '/market-analysis',
  BROKER_SIGNUP: '/broker-signup',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Villa',
  'Penthouse',
  'Land',
  'Commercial',
  'Industrial',
] as const;

export const AMENITIES = [
  'Pool',
  'Garden',
  'Garage',
  'Security',
  'Elevator',
  'Gym',
  'Parking',
  'Air Conditioning',
  'Heating',
  'Internet',
] as const;

export const AUCTION_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  ENDED: 'ended',
  CANCELLED: 'cancelled',
} as const;

export const USER_ROLES = {
  USER: 'user',
  BROKER: 'broker',
  ADMIN: 'admin',
} as const;

export const TOAST_DURATION = 5000;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const; 