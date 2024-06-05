import { z } from 'zod';

export const userRegSchema = z.object({
  name: z.string().min(1, 'Enter name'),
  email: z.string().min(1, 'Enter email').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be above 5 characters'),
});

export const userLogSchema = z.object({
  email: z.string().min(1, 'Enter email').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be above 5 characters'),
});

export const hotelFormSchema = z.object({
  name: z.string().min(1, 'Enter name'),
  city: z.string().min(1, 'Enter city'),
  country: z.string().min(1, 'Enter country'),
  description: z.string().min(1, 'Enter description'),
  type: z.string().min(1, 'Enter type'),
  pricePerNight: z.number().min(1, 'Enter price'),
  starRating: z.number().min(1, 'Enter Star').max(5, 'Max value is till 5'),
  facilities: z.array(z.string()).min(1, 'Select at least one field'),
  imageFiles: z.any().refine((val) => val.length > 0, 'Select images'),
  imageUrls: z.array(z.string()).min(1, 'Select at images'),
  adultCount: z.number().min(1, 'Enter adult count'),
  childCount: z.number().min(0, 'Enter child count'),
});
