import { useContext } from 'react';
import { AppContext, AppContextType } from '../context/AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};
