import { Link } from 'react-router-dom';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import * as actions from '../actions/hotel-actions';

const MyHotels = () => {
  const { data: hotelsData, isLoading } = useQuery({
    queryKey: ['fetchMyHotels'],
    queryFn: actions.getAllHotels,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!hotelsData || hotelsData.length === 0) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelsData.map((hotel) => (
          <div key={hotel.id} className="flex gap-2">
            <img
              className="flex-shrink object-cover rounded-xl"
              src={hotel.image_urls[0]}
              width={200}
              height={200}
              alt="error in image urls"
            />
            <div
              data-testid="hotel-card"
              className=" flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
            >
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />£{hotel.price_per_night} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adult_count} adults, {hotel.child_count} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.star_rating} Star Rating
                </div>
              </div>
              <span className="flex justify-end">
                <Link
                  to={`/edit-hotel/${hotel.id}`}
                  className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                >
                  View Details
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
