import { useSearchContext } from '../lib/utils';
import * as actions from '../actions/index';
import { useQuery } from '@tanstack/react-query';
import SearchResultsCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';

function Search() {
  const context = useSearchContext();

  const searchParams = {
    destination: context.destination,
    checkIn: context.checkIn.toISOString(),
    checkOut: context.checkOut.toISOString(),
    adultCount: context.adultCount.toString(),
    childCount: context.childCount.toString(),
    page: context.page.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => actions.searchHotels(searchParams),
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        {/* TODO: */}
        FilterBy:
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
          // selectedStars={selectedStars}
          // onChange={handleStarsChange}
          />
          {/* <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
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
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard key={hotel.id} hotel={hotel} />
        ))}
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
