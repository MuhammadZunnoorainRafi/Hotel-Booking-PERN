import ManageHotelForm from '../components/forms/ManageHotelForm/ManageHotelForm';

function AddHotel() {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center py-3">Add a Hotel</h1>
      <div>
        <ManageHotelForm />
      </div>
    </div>
  );
}

export default AddHotel;
