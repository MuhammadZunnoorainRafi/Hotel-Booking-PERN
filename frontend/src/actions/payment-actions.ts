import axios from 'axios';
import { ErrorT, PaymentIntentResponse } from '../lib/types';
import { errorHandler } from '../lib/utils';
import { BookingFormData } from '../components/forms/BookingForm/BookingForm';

const BASE_API_URL = import.meta.env.VITE_API_URL || '';

export const createPaymentIntent = async (
  hotelId: string,
  totalNights: string
): Promise<PaymentIntentResponse> => {
  try {
    const res = await axios.post(
      `${BASE_API_URL}/api/hotel/booking/${hotelId}/payment-intent`,
      { totalNights },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};

export const createBookingRoom = async (formData: BookingFormData) => {
  try {
    await axios.post(
      `${BASE_API_URL}/api/hotel/${formData.hotelId}/booking`,
      formData,
      { withCredentials: true }
    );
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};
