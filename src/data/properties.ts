import { Property } from '@/types/property';

// Sample featured properties
export const featuredProperties: Property[] = [
  {
    id: '1',
    name: 'Modern Apartment',
    location: 'Downtown, San Francisco',
    price: 1250000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop',
    isPremium: true,
    description: 'Stunning modern apartment with incredible city views and premium finishes.',
    views: 2354,
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['2 Bedrooms', '2 Bathrooms', 'City View', 'Modern Kitchen', 'Parking Space'],
    rating: 4.9,
    reviews: 156
  },
  {
    id: '2',
    name: 'Luxury Villa',
    location: 'Nob Hill, San Francisco',
    price: 3200000,
    beds: 4,
    baths: 3.5,
    sqft: 3500,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    description: 'Spectacular luxury villa with panoramic views and a private garden oasis.',
    views: 1875,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['4 Bedrooms', '3.5 Bathrooms', 'Private Garden', 'Wine Cellar', 'Home Theater'],
    rating: 4.8,
    reviews: 98
  },
  {
    id: '3',
    name: 'Waterfront Condo',
    location: 'Marina District, San Francisco',
    price: 1850000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    isPremium: true,
    description: 'Beautiful waterfront condo with direct marina access and luxury amenities.',
    views: 3102,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
    ],
    features: ['3 Bedrooms', '2 Bathrooms', 'Marina View', 'Gym Access', 'Concierge Service'],
    rating: 4.7,
    reviews: 142
  }
]; 