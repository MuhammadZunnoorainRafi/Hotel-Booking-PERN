import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelFormSchema } from '../../../lib/schemas';
import { HotelFormData } from '../../../lib/types';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestSection';
import ImagesSection from './ImageSection';

type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

function ManageHotelForm({ onSave, isLoading }: Props) {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      // facilities: [],
    },
  });

  const { handleSubmit } = formMethods;

  const formSubmit = (formDataJson: HotelFormData) => {
    const formData = new FormData();
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    // if (formDataJson.imageUrls) {
    //   formDataJson.imageUrls.forEach((url, index) => {
    //     formData.append(`imageUrls[${index}]`, url);
    //   });
    // }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
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
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default ManageHotelForm;
