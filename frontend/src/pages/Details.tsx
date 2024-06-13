import { useParams } from 'react-router-dom';
import * as actions from '../actions/index';
import { AiFillStar } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import GuestInfoForm from '../components/forms/GuestInfoForm/GuestInfoForm';

const Details = () => {
  const params = useParams();

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['fetchHotel', params.id],
    queryFn: () => actions.getOneHotel(params.id || ''),
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!hotelData) {
    return <>No Hotel Found</>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotelData.star_rating }).map((_, ind) => (
            <AiFillStar key={ind} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelData.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData.image_urls.map((image, ind) => (
          <div key={ind} className="h-[300px]">
            <img
              src={image}
              alt={hotelData.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData.facilities.map((facility, ind) => (
          <div key={ind} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelData.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotelData.price_per_night}
            hotelId={hotelData.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
