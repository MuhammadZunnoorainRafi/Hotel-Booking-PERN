import z from 'zod';
import { hotelFormSchema, userLogSchema, userRegSchema } from './schemas';
import { Stripe } from '@stripe/stripe-js';

export type AppContextType = {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  };
  stripePromise: Promise<Stripe | null>;
};

export type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  page: number;
  hotelId?: string;
  setPage: (page: number) => void;
  saveSearchValue: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
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

// export type HotelType = {
//   id: string;
//   userId: string;
//   name: string;
//   city: string;
//   country: string;
//   description: string;
//   type: string;
//   adultCount: number;
//   childCount: number;
//   facilities: string[];
//   pricePerNight: number;
//   starRating: number;
//   imageUrls: string[];
//   createdAt: Date;
//   // bookings: BookingType[];
// };

export type HotelTypeSql = {
  id: string;
  user_id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adult_count: number;
  child_count: number;
  facilities: string[];
  price_per_night: number;
  star_rating: number;
  image_urls: string[];
  created_at: Date;
  // bookings: BookingType[];
};

export type HotelFormData = z.infer<typeof hotelFormSchema>;

export type HotelSearchResponse = {
  data: HotelTypeSql[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type SearchParamsType = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
  page?: string;
};

export type ErrorT = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalPrice: number;
};

export type UserType = { id: string; name: string; email: string };
