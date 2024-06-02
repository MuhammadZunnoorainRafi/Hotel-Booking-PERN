import axios from 'axios';
import { ErrorT, RegUser } from '../lib/types';
import { errorHandler } from '../lib/utils';

const BASE_API_URL = import.meta.env.VITE_API_URL;
export const register = async (formData: RegUser) => {
  try {
    const res = await axios.post(
      `${BASE_API_URL}/api/user/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};

export const verifyToken = async () => {
  try {
    const res = await axios.get(`${BASE_API_URL}/api/user/validate-token`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error(errorHandler(error as ErrorT));
  }
};
