import { useSearchContext } from '../lib/utils';
import * as actions from '../actions/index';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function Search() {
  const context = useSearchContext();

  const [page, setPage] = useState(1);

  const searchParams = {
    destination: context.destination,
    checkIn: context.checkIn.toISOString(),
    checkOut: context.checkOut.toISOString(),
    adultCount: context.adultCount.toString(),
    childCount: context.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => actions.searchHotels(searchParams),
  });
  return <div>Search</div>;
}

export default Search;
