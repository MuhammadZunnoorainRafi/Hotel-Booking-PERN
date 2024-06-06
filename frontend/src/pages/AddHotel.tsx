import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import * as actions from '../actions/index';
import ManageHotelForm from '../components/forms/ManageHotelForm/ManageHotelForm';
import { useNavigate } from 'react-router-dom';

function AddHotel() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: actions.addHotel,
    onSuccess: () => {
      navigate('/');
      toast.success('Hotel added Successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSave = (formDataJson: FormData) => {
    mutation.mutate(formDataJson);
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto py-8">
        <ManageHotelForm onSave={handleSave} isLoading={mutation.isPending} />
      </div>
    </div>
  );
}

export default AddHotel;
