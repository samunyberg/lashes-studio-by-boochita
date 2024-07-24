'use client';

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FormError from '../common/forms/FormError';

interface Props {
  appointmentId: number;
}

const CancelButton = ({ appointmentId }: Props) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCancel = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch('/api/appointments/' + appointmentId + '/cancel');
      router.refresh();
      setShowConfirmation(false);
      toast.success('Appointment cancelled successfully');
    } catch (error: unknown) {
      let errorMessage = '';
      if (error instanceof AxiosError)
        errorMessage = error.response?.data.error;
      else errorMessage = 'Whoops! Something went wrong.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        className='!bg-red-400 text-white'
        onClick={() => setShowConfirmation(true)}
      >
        Cancel this appointment
      </Button>
      <Modal
        isVisible={showConfirmation}
        header={<h1 className='font-semibold'>Cancel appointment</h1>}
        content={
          <div>
            <h2 className='my-5 mb-8 font-medium'>
              Are you sure you want to cancel this appointment?
            </h2>
            <FormError className='mb-4'>{error}</FormError>
            <div className='flex flex-col gap-5 lg:flex-row-reverse lg:justify-between'>
              <Button
                className='!bg-red-400 text-white'
                onClick={handleCancel}
                isLoading={isSubmitting}
              >
                Yes, cancel
              </Button>
              <Button onClick={() => setShowConfirmation(false)}>
                Go back
              </Button>
            </div>
          </div>
        }
        onClose={() => setShowConfirmation(false)}
      />
    </>
  );
};

export default CancelButton;
