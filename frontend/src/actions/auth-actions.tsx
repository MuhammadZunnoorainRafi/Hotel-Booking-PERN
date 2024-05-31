import axios from 'axios';
import { RegUser } from '../lib/types';

const BASE_API_URL = import.meta.env.BASE_API_URL;

export const register = async (formData: RegUser) => {
  let res;
  try {
    res = await axios.post(`${BASE_API_URL}/api/user/register`, formData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw new Error(res?.statusText);
  }
};
