import { ReactNode, createContext, useState } from 'react';
import { SearchContextType } from '../lib/types';

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [hotelId, setHotelId] = useState('');
  const [page, setPage] = useState(1);

  const saveSearchValue = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        page,
        saveSearchValue,
        setPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
