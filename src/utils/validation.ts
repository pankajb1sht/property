import { z } from 'zod';
import { PROPERTY_TYPES, AMENITIES, USER_ROLES } from '@/config/constants';

export const propertySchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().positive(),
  location: z.object({
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    country: z.string().min(2),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  features: z.object({
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(0),
    area: z.number().positive(),
    yearBuilt: z.number().int().min(1800).max(new Date().getFullYear()),
  }),
  amenities: z.array(z.enum(AMENITIES as unknown as [string, ...string[]])),
  images: z.array(z.string().url()),
  type: z.enum(PROPERTY_TYPES as unknown as [string, ...string[]]),
  status: z.enum(['available', 'pending', 'sold']),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  name: z.string().min(2),
  role: z.enum(Object.values(USER_ROLES) as [string, ...string[]]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  message: z.string().min(10),
});

export const searchSchema = z.object({
  query: z.string().min(2).optional(),
  type: z.enum(PROPERTY_TYPES as unknown as [string, ...string[]]).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  location: z.string().min(2).optional(),
  amenities: z.array(z.enum(AMENITIES as unknown as [string, ...string[]])).optional(),
});

export type Property = z.infer<typeof propertySchema>;
export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
export type SearchFilters = z.infer<typeof searchSchema>; 