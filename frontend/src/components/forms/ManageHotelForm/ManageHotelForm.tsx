import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelFormSchema } from '../../../lib/schemas';
import { HotelFormData } from '../../../lib/types';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestSection';
import ImagesSection from './ImageSection';

function ManageHotelForm() {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      // facilities: [],
    },
  });

  const { handleSubmit } = formMethods;

  const formSubmit = (formData: HotelFormData) => {
    console.log(formData);
    console.log(123);
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(formSubmit)}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <div className="text-center">
            <button className="btn btn-primary btn-wide my-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ManageHotelForm;
