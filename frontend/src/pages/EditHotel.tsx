import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as actions from '../actions/hotel-actions';
import ManageHotelForm from '../components/forms/ManageHotelForm/ManageHotelForm';
import toast from 'react-hot-toast';

function EditHotel() {
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['fetchHotel', params.id],
    queryFn: () => actions.getOneHotel(params.id || ''),
    enabled: !!params.id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: actions.updateHotel,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['fetchHotel', params.id],
      });
      navigate('/my-hotels');
      toast.success('Hotel saved');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

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
