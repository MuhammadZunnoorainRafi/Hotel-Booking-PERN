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
  type: z
    .string({
      invalid_type_error: 'Select Type',
    })
    .min(1, 'Select type'),
  pricePerNight: z.string().min(1, 'Enter price'),
  starRating: z.string().min(1, 'Enter Star rating'),
  facilities: z
    .array(z.string())
    .nonempty({ message: 'Select at least one field' }),
  adultCount: z.string().min(1, 'Enter adult count'),
  childCount: z.string().min(1, 'Enter child count'),
});
