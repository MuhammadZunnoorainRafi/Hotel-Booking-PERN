import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext } from 'react';
import * as actions from '../actions/index';
import { AppContextType } from '../lib/types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isError, data } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: actions.verifyToken,
  });
  return (
    <AppContext.Provider value={{ isLoggedIn: !isError, user: data?.user }}>
      {children}
    </AppContext.Provider>
  );
};
