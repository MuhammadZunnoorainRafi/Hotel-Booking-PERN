import z from 'zod';
import { hotelFormSchema, userLogSchema, userRegSchema } from './schemas';

export type AppContextType = {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export type RegUser = z.infer<typeof userRegSchema>;
export type LogUser = z.infer<typeof userLogSchema>;

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

export type FormT = z.infer<typeof hotelFormSchema>;

export type ErrorT = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};
