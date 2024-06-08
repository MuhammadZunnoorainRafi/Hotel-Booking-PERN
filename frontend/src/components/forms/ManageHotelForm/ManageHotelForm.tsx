import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { hotelFormSchema } from '../../../lib/schemas';
import { HotelFormData, HotelTypeSql } from '../../../lib/types';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestSection';
import ImagesSection from './ImageSection';
import { useEffect } from 'react';

type Props = {
  onSave: (formData: FormData) => void;
  hotel?: HotelTypeSql;
  isLoading: boolean;
};

function ManageHotelForm({ onSave, hotel, isLoading }: Props) {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      facilities: [],
    },
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const formSubmit = (formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('id', hotel.id);
    }
    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('price_per_night', formDataJson.price_per_night.toString());
    formData.append('star_rating', formDataJson.star_rating.toString());
    formData.append('adult_count', formDataJson.adult_count.toString());
    formData.append('child_count', formDataJson.child_count.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.image_urls) {
      formDataJson.image_urls.forEach((url, ind) => {
        formData.append(`image_urls[${ind}]`, url);
      });
    }

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
