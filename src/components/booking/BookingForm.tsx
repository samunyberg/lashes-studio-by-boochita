'use client';

import { ServiceWithServiceOptions } from '@/app/book/page';
import BookingDataContext from '@/contexts/bookingDataContext';
import type { Appointment, Service, ServiceOption } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import StrikeThroughText from '../common/StrikeThroughText';
import BookingButtons from './BookingButtons';
import BookingHeader from './BookingHeader';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Label from '../common/Label';

const steps = [
  {
    stepNumber: 1,
    description: 'select_appointment_time',
  },
  {
    stepNumber: 2,
    description: 'select_style',
  },
  {
    stepNumber: 3,
    description: 'confirm_your_booking',
  },
];

export interface Step {
  stepNumber: number;
  description: string;
}

export interface BookingData {
  appointment: Appointment | null;
  service: Service | null;
  serviceOption: ServiceOption | null;
}

interface Props {
  appointments: Appointment[];
  services: ServiceWithServiceOptions[];
}

const BookingForm = ({ appointments, services }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({} as BookingData);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleBooking = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        `api/appointments/${bookingData.appointment!.id}/book`,
        {
          userId: session?.user.id,
          serviceId: bookingData.service!.id,
          serviceOptionId: bookingData.serviceOption!.id,
        }
      );
      router.push('/book/thank-you/?email=' + session?.user.email);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      let errorMessage = '';
      const err = error as AxiosError;
      if (err.response?.status === 409)
        errorMessage =
          'Oh no! Looks like this appointment was booked just a moment ago. Please choose a different time.';
      else if (err.response?.status === 403)
        errorMessage =
          'Appointment must be booked at least one hour before start time. Please choose a different appointment time.';
      else errorMessage = 'Whoops! Something went wrong. Please try again.';
      setBookingError(errorMessage);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) return;

    setCurrentStep(currentStep - 1);
    scrollToTop();
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
    if (currentStep === steps.length) handleBooking();
  };

  const isStepComplete = () => {
    if (currentStep === 1) return !!bookingData.appointment;
    if (currentStep === 2)
      return !!bookingData.service && !!bookingData.serviceOption;
    if (currentStep === steps.length) return true;
  };

  return (
    <BookingDataContext.Provider
      value={{
        bookingData,
        setBookingData,
        bookingError,
      }}
    >
      <div className='pb-16 md:mx-auto md:max-w-[450px] lg:max-w-[650px]'>
        <StrikeThroughText className='pb-6 pt-5'>
          <Label labelId='book_appointment' />
        </StrikeThroughText>
        <BookingHeader steps={steps} currentStep={currentStep} />
        {status === 'loading' ? (
          <div className='mt-24 flex h-full w-full items-center justify-center'>
            <ThreeDots height='40' width='40' color='#524237' visible={true} />
          </div>
        ) : (
          <>
            <div className='mb-8 mt-6'>
              {currentStep === 1 && <Step1 appointments={appointments} />}
              {currentStep === 2 && <Step2 services={services} />}
              {currentStep === 3 && <Step3 />}
            </div>
            <BookingButtons
              steps={steps}
              currentStep={currentStep}
              onBackClick={handleBack}
              onNextClick={handleNext}
              isNextDisabled={!isStepComplete()}
              isSubmitting={isSubmitting}
            />
          </>
        )}
      </div>
    </BookingDataContext.Provider>
  );
};

export default BookingForm;
