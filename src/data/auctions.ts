import { Auction } from '@/types/auction';

export const mockAuctions: Auction[] = [
  {
    id: '1',
    title: 'Luxury Waterfront Villa',
    location: 'Miami Beach, FL',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
    currentBid: 2500000,
    startPrice: 2000000,
    status: 'live',
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    participants: 12,
    propertyType: 'house',
    bedrooms: 5,
    bathrooms: 4,
    description: 'Stunning waterfront villa with panoramic ocean views'
  },
  {
    id: '2',
    title: 'Modern Downtown Penthouse',
    location: 'New York, NY',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60',
    currentBid: 4200000,
    startPrice: 4000000,
    status: 'upcoming',
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    participants: 8,
    propertyType: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    description: 'Luxurious penthouse in the heart of Manhattan'
  },
  {
    id: '3',
    title: 'Historic Brownstone',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=60',
    currentBid: 1800000,
    startPrice: 1500000,
    status: 'ended',
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    participants: 15,
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    description: 'Beautifully restored historic brownstone'
  }
]; 