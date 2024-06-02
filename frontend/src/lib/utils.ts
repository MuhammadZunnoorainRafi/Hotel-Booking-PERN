import { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContext';
import { ErrorT } from './types';

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export const errorHandler = (err: ErrorT) => {
  return err.response.data.message || err.message;
};
