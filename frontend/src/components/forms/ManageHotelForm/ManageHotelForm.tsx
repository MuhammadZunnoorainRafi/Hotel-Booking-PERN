import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelFormSchema } from '../../../lib/schemas';
import { HotelFormData } from '../../../lib/types';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';

function ManageHotelForm() {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
  });

  const formSubmit = (formData: HotelFormData) => {
    console.log(formData);
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(formSubmit)}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
        </form>
      </FormProvider>
    </div>
  );
}

export default ManageHotelForm;
