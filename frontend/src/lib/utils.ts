import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { AppContextType, ErrorT, SearchContextType } from './types';
import { SearchContext } from '../context/SearchContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  // if (!context) {
  //   throw new Error('CurrentUserContext: No value provided');
  // }
  return context as AppContextType;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContextType;
};

export const errorHandler = (err: ErrorT) => {
  return err.response?.data?.message || err.message;
};
