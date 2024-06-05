import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelFormSchema } from '../../../lib/schemas';
import { HotelFormData } from '../../../lib/types';

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
        <form onSubmit={formMethods.handleSubmit(formSubmit)}></form>
      </FormProvider>
    </div>
  );
}

export default ManageHotelForm;
