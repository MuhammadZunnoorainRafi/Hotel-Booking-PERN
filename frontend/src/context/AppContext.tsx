import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext } from 'react';
import * as actions from '../actions/index';

export type AppContextType = {
  isLoggedIn: boolean;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isError } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: actions.verifyToken,
    retry: false,
  });
  return (
    <AppContext.Provider value={{ isLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};
