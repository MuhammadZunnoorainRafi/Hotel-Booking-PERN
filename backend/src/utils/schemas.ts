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
