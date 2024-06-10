import axios from 'axios';
import { ErrorT, HotelSearchResponse, SearchParamsType } from '../lib/types';
import { errorHandler } from '../lib/utils';

const BASE_API_URL = import.meta.env.VITE_API_URL || '';

export const searchHotels = async (
  searchParams: SearchParamsType
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.set('destination', searchParams.destination || '');
  queryParams.set('checkIn', searchParams.checkIn || '');
  queryParams.set('checkOut', searchParams.checkOut || '');
  queryParams.set('adultCount', searchParams.adultCount || '');
  queryParams.set('childCount', searchParams.childCount || '');
  queryParams.set('page', searchParams.page || '');
  try {
    const res = await axios.get(
      `${BASE_API_URL}/api/hotel/search?${queryParams}`
    );
    return res.data;
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};
