export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  isPremium?: boolean;
  isLiked?: boolean;
  isSaved?: boolean;
  isRecentlyAdded?: boolean;
  description?: string;
  views?: number;
  mediaCount?: number;
  currentMediaIndex?: number;
  images?: string[];
  features?: string[];
  rating?: number;
  reviews?: number;
}

export type PropertyFeedActionType = 'like' | 'save' | 'share' | 'details' | 'comment' | 'contact';
