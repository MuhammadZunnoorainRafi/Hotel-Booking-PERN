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
  const [destination, setDestination] = useState<string>(
    // sessionStorage.getItem('destination') || ''
    ''
  );
  const [checkIn, setCheckIn] = useState<Date>(
    // new Date(sessionStorage.getItem('checkIn') || new Date().toISOString())
    new Date()
  );
  const [checkOut, setCheckOut] = useState<Date>(
    // new Date(sessionStorage.getItem('checkOut') || new Date().toISOString())
    new Date()
  );
  const [adultCount, setAdultCount] = useState<number>(
    // parseInt(sessionStorage.getItem('adultCount') || '1')
    1
  );
  const [childCount, setChildCount] = useState<number>(
    // parseInt(sessionStorage.getItem('childCount') || '0')
    0
  );
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

    // sessionStorage.setItem('destination', destination);
    // sessionStorage.setItem('checkIn', checkIn.toISOString());
    // sessionStorage.setItem('checkOut', checkOut.toISOString());
    // sessionStorage.setItem('childCount', childCount.toString());
    // sessionStorage.setItem('adultCount', adultCount.toString());
    // if (hotelId) {
    //   sessionStorage.setItem('hotelId', hotelId);
    // }
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
