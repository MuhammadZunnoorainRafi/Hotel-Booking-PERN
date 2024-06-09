import axios from 'axios';
import { ErrorT, HotelSearchResponse } from '../lib/types';
import { errorHandler } from '../lib/utils';

export type SearchParamsType = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
};

const BASE_API_URL = import.meta.env.VITE_API_URL || '';

export const searchHotels = async (
  searchParams: SearchParamsType
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');

  try {
    const res = await axios.get(`${BASE_API_URL}/search?${queryParams}`);
    return res.data;
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};
