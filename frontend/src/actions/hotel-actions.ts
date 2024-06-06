import axios from 'axios';
import { ErrorT } from '../lib/types';
import { errorHandler } from '../lib/utils';

const BASE_API_URL = import.meta.env.VITE_API_URL || '';

export const addHotel = async (formData: FormData) => {
  try {
    await axios.post(`${BASE_API_URL}/api/hotel/add`, formData, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};
