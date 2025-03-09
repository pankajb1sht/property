export interface Auction {
  id: string;
  title: string;
  location: string;
  image: string;
  currentBid: number;
  startPrice: number;
  status: 'live' | 'upcoming' | 'ended';
  endDate: string;
  participants: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
} 