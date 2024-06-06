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
  pricePerNight: z
    .number({
      invalid_type_error: 'Enter price',
    })
    .min(1, 'Enter price'),
  starRating: z
    .number({
      invalid_type_error: 'Select value',
    })
    .min(1, 'Select value')
    .max(5, 'Max value is till 5'),
  facilities: z
    .array(z.string())
    .nonempty({ message: 'Select at least one field' }),
  imageFiles: z
    .instanceof(FileList)
    .refine((val) => val.length > 0, 'Select images')
    .refine((val) => val.length < 7, 'Select images between limit of 1-6'),
  adultCount: z
    .number({ invalid_type_error: 'Enter adult count' })
    .min(1, 'Enter adult count'),
  childCount: z
    .number({ invalid_type_error: 'Enter child count' })
    .min(0, 'Enter child count'),
});
