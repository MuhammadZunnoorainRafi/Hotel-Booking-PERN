export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

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

export type HotelSearchResponse = {
  data: HotelTypeSql[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
