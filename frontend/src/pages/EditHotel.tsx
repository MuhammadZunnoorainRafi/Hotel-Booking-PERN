import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as actions from '../actions/hotel-actions';
import ManageHotelForm from '../components/forms/ManageHotelForm/ManageHotelForm';
import toast from 'react-hot-toast';

function EditHotel() {
  const params = useParams();
  const { data: hotelData } = useQuery({
    queryKey: ['fetchHotel', params.id],
    queryFn: () => actions.getOneHotel(params.id || ''),
    enabled: !!params.id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: actions.updateHotel,
    onSuccess: () => {
      toast.success('Hotel saved');
    },
    onError: () => {
      toast.error('Error while saving hotel');
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  if (!hotelData) {
    return <p>No hotel data founded</p>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ManageHotelForm
        hotel={hotelData}
        onSave={handleSave}
        isLoading={isPending}
      />
    </div>
  );
}

export default EditHotel;
