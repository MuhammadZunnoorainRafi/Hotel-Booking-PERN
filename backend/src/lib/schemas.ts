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
  id: z.string().optional(),
  name: z.string().min(1, 'Enter name'),
  city: z.string().min(1, 'Enter city'),
  country: z.string().min(1, 'Enter country'),
  description: z.string().min(1, 'Enter description'),
  type: z
    .string({
      invalid_type_error: 'Select Type',
    })
    .min(1, 'Select type'),
  price_per_night: z.string().min(1, 'Enter price'),
  star_rating: z.string().min(1, 'Enter Star rating'),
  facilities: z
    .array(z.string())
    .nonempty({ message: 'Select at least one field' }),
  adult_count: z.string().min(1, 'Enter adult count'),
  child_count: z.string().min(1, 'Enter child count'),
  image_urls: z.array(z.string()).optional(),
});

export const bookingSchema = z.object({
  name: z.string().min(1, 'Enter name'),
  email: z.string().min(1, 'Enter email').email('Enter a valid email address'),
  childCount: z.number().min(0, 'min value is 0'),
  adultCount: z.number().min(0, 'min value is 1'),
  checkIn: z.string().min(1, { message: 'enter check_in date' }),
  checkOut: z.string().min(1, { message: 'enter check_out date' }),
  hotelId: z.string().min(1, 'enter hotelId'),
  paymentIntentId: z.string().min(1, 'enter paymentIntentId'),
  totalCost: z.number().min(1, 'Enter total cost'),
});
