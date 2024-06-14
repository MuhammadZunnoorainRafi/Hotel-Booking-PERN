import { useParams } from 'react-router-dom';
import { useAppContext, useSearchContext } from '../lib/utils';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as actions from '../actions/index';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import BookingForm from '../components/forms/BookingForm/BookingForm';

const Booking = () => {
  const { stripePromise, user: currentUser } = useAppContext();
  const search = useSearchContext();
  const params = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);
  const { data: paymentIntentData } = useQuery({
    queryKey: ['createPaymentIntent'],
    queryFn: () =>
      actions.createPaymentIntent(
        params.id as string,
        numberOfNights.toString()
      ),
    enabled: !!params.id && numberOfNights > 0,
  });

  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['fetchHotel', params.id],
    queryFn: () => actions.getOneHotel(params.id as string),
    enabled: !!params.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!hotelData) {
    return <>No Hotel Found</>;
  }
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotelData}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
