'use client';

import { ServiceWithServiceOptions } from '@/app/book/page';
import BookingDataContext from '@/contexts/bookingDataContext';
import type { Appointment, Service, ServiceOption } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import StrikeThroughText from '../common/StrikeThroughText';
import BookingButtons from './BookingButtons';
import BookingHeader from './BookingHeader';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3, { ContactInfoFormData, formSchema } from './Step3';
import Step4 from './Step4';

const steps = [
  {
    stepNumber: 1,
    label: 'Date and Time',
    description: 'Select appointment time',
  },
  {
    stepNumber: 2,
    label: 'Style',
    description: 'Select Style',
  },
  {
    stepNumber: 3,
    label: 'Info',
    description: 'Contact Information',
  },
  {
    stepNumber: 4,
    label: 'Confirm',
    description: 'Confirm Your Booking',
  },
];

export interface Step {
  stepNumber: number;
  label: string;
  description: string;
}

export interface BookingData {
  appointment: Appointment | null;
  service: Service | null;
  serviceOption: ServiceOption | null;
  formData: ContactInfoFormData;
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
  const [contactInfoFormData, setContactInfoFormData] =
    useState<ContactInfoFormData>({} as ContactInfoFormData);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setContactInfoFormData({
        name: session.user.name || '',
        email: session.user?.email || '',
        phone: session.user.phone || '',
      });
    }
  }, [session]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleBooking = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(
        `api/appointments/${bookingData.appointment!.id}/book`,
        {
          serviceId: bookingData.service!.id,
          serviceOptionId: bookingData.serviceOption!.id,
          clientName: bookingData.formData.name,
          clientEmail: bookingData.formData.email,
          clientPhone: bookingData.formData.phone,
        }
      );
      router.push('/book/thank-you/?email=' + bookingData.formData.email);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      const errorMessage =
        (error as AxiosError).response?.status === 409
          ? 'Oh no! Looks like this appointment was booked just a moment ago. Please choose a different time.'
          : 'Whoops! Something went wrong. Please try again.';
      setBookingError(errorMessage);
    }
  };

  const handleContactInfoChange = (data: ContactInfoFormData) => {
    setContactInfoFormData(data);
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
    if (currentStep === 3) {
      setBookingData({ ...bookingData, formData: contactInfoFormData });
      return;
    }
    if (currentStep === steps.length) handleBooking();
  };

  const isStepComplete = () => {
    if (currentStep === 1) return !!bookingData.appointment;
    if (currentStep === 2)
      return !!bookingData.service && !!bookingData.serviceOption;
    if (currentStep === 3) {
      return !!formSchema.safeParse(contactInfoFormData).success;
    }
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
        <StrikeThroughText className='mb-6 mt-2'>
          Book Appointment
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
              {currentStep === 3 && (
                <Step3
                  data={contactInfoFormData}
                  onChange={handleContactInfoChange}
                />
              )}
              {currentStep === 4 && <Step4 />}
            </div>
            <BookingButtons
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
