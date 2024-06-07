import { useFormContext } from 'react-hook-form';
import { HotelFormData } from '../../../lib/types';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            {...register('adult_count', {
              valueAsNumber: true,
            })}
          />
          {errors.adult_count?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adult_count?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            {...register('child_count', {
              valueAsNumber: true,
            })}
          />
          {errors.child_count?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.child_count?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
