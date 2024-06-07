import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as actions from '../actions/hotel-actions';

function EditHotel() {
  const params = useParams();
  const { data: hotelData } = useQuery({
    queryKey: ['fetchHotel', params.id],
    queryFn: () => actions.getOneHotel(params.id || ''),
  });
  console.log(hotelData);
  return <div>EditHotel {hotelData?.country}</div>;
}

export default EditHotel;
