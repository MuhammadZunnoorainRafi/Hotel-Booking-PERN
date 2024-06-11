import { useSearchContext } from '../lib/utils';
import * as actions from '../actions/index';
import { useQuery } from '@tanstack/react-query';
import SearchResultsCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import { useState } from 'react';
import HotelTypesFilter from '../components/HotelTypesFilter';

function Search() {
  const context = useSearchContext();

  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);

  const searchParams = {
    destination: context.destination,
    checkIn: context.checkIn.toISOString(),
    checkOut: context.checkOut.toISOString(),
    adultCount: context.adultCount.toString(),
    childCount: context.childCount.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    page: context.page.toString(),
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;
    setSelectedStars((prev) =>
      e.target.checked
        ? [...prev, starRating]
        : selectedStars.filter((star) => star !== starRating)
    );
  };

  const handleTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;
    setSelectedHotelTypes((prev) =>
      e.target.checked
        ? [...prev, hotelType]
        : selectedHotelTypes.filter((val) => val !== hotelType)
    );
  };
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => actions.searchHotels(searchParams),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        FilterBy:
        <div className="space-y-5">
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleTypesChange}
          />
          {/* TODO: */}

          {/* <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          /> */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {context.destination ? ` in ${context.destination}` : ''}
          </span>
          <select
            // value={sortOption}
            // onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-3 h-[330px] m-4">
            <div className="col-span-1 skeleton"></div>
            <div className="space-y-3 col-span-2">
              <p className="skeleton h-5 w-[500px]"></p>
              <p className="skeleton h-5 w-[400px]"></p>
            </div>
          </div>
        ) : (
          hotelData?.data.map((hotel) => (
            <SearchResultsCard key={hotel.id} hotel={hotel} />
          ))
        )}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
