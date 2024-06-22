import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext } from 'react';
import * as actions from '../actions/index';
import { AppContextType } from '../lib/types';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || '';

export const AppContext = createContext<AppContextType | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const { isError, data, isLoading } = useQuery({
    queryKey: ['verifyToken'],
    queryFn: actions.verifyToken,
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  return (
    <AppContext.Provider
      value={{ isLoggedIn: !isError, user: data.user, stripePromise }}
    >
      {children}
    </AppContext.Provider>
  );
};
