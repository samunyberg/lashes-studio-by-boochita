'use client';

import BookingDataContext from '@/contexts/bookingDataContext';
import { BookingData, ServiceWithServiceOptions } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar from '../calendar/Calendar';
import Container from '../common/Container';
import Label from '../common/Label';
import StrikeThroughText from '../common/StrikeThroughText';
import BookingButtons from './BookingButtons';
import BookingHeader from './BookingHeader';
import Step2 from './Step2';
import Step3 from './Step3';

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

interface Props {
  services: ServiceWithServiceOptions[];
  appointments: Appointment[];
}

const BookingForm = ({ services, appointments }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({} as BookingData);
  const [termsAccepted, setTermsAccepted] = useState(false);
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
          servicePrice: bookingData.serviceOption?.price,
        }
      );
      router.push('/book/thank-you/?email=' + session?.user.email);
    } catch (error) {
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
    } finally {
      setIsSubmitting(false);
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
    if (currentStep === steps.length) return termsAccepted;
  };

  return (
    <BookingDataContext.Provider
      value={{
        bookingData,
        setBookingData,
        bookingError,
        termsAccepted,
        setTermsAccepted,
      }}
    >
      <Container className='pb-8'>
        <StrikeThroughText className='mb-8'>
          <Label labelId='book_appointment' />
        </StrikeThroughText>
        <BookingHeader steps={steps} currentStep={currentStep} />
        <>
          <div className='mb-8 mt-6'>
            {currentStep === 1 && (
              <Calendar
                initialData={appointments}
                onAppointmentSelect={(app: Appointment) =>
                  setBookingData({ ...bookingData, appointment: app })
                }
              />
            )}
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
      </Container>
    </BookingDataContext.Provider>
  );
};

export default BookingForm;
