'use client';

import Calendar from '@/components/calendar/Calendar';
import AppointmentPanel from '@/components/common/appointments/appointmentPanel/AppointmentPanel';
import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Container from '@/components/common/Container';
import FormError from '@/components/common/forms/FormError';
import Modal from '@/components/common/Modal';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { AppointmentWithData } from '@/lib/types';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Props {
  oldAppointment: AppointmentWithData;
  upcomingAppointments: AppointmentWithData[];
}

const Reschedule = ({ oldAppointment, upcomingAppointments }: Props) => {
  const router = useRouter();
  const [newAppointment, setNewAppointment] = useState<Appointment | null>(
    null
  );
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleReschedule = async () => {
    try {
      setIsSubmitting(true);
      await axios.patch(`/api/appointments/${oldAppointment.id}/reschedule`, {
        oldId: oldAppointment.id,
        newId: newAppointment?.id,
        userId: oldAppointment.userId,
        serviceId: oldAppointment.service?.id,
        serviceOptionId: oldAppointment.serviceOption?.id,
        clientName: oldAppointment.clientName,
        serviceName: oldAppointment.serviceName,
        serviceOptionName: oldAppointment.serviceOptionName,
        servicePrice: oldAppointment.servicePrice,
        adminNote: oldAppointment.adminNote,
      });
      router.replace('/admin/appointments/' + newAppointment?.id);
      router.refresh();
      setShowConfirmation(false);
      toast.success('Appointment rescheduled successfully');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentSelect = (app: Appointment) => {
    setNewAppointment(app);
    setShowConfirmation(true);
  };

  const confirmationModal = (
    <Modal
      isVisible={showConfirmation}
      header={<h1 className='text-lg font-semibold'>Reschedule appointment</h1>}
      content={
        <div className='flex flex-col gap-4'>
          <h2 className='mt-5 font-medium'>Reschedule this appointment?</h2>
          <div className='mb-5 flex flex-col  gap-4'>
            <AppointmentPanel appointment={oldAppointment} />
            <FaArrowDown className='self-center' size={15} />
            {newAppointment && (
              <AppointmentPanel
                appointment={newAppointment as AppointmentWithData}
              />
            )}
          </div>
          <div className='mb-8 flex items-center gap-2'>
            <CheckBox isChecked={true} />
            <p>Send notification email to client</p>
          </div>
          <FormError className='mb-4'>{error}</FormError>
          <div className='flex flex-col gap-4 lg:flex-row-reverse lg:justify-between'>
            <Button
              variant='accent'
              onClick={handleReschedule}
              isLoading={isSubmitting}
            >
              Confirm
            </Button>
            <Button onClick={() => setShowConfirmation(false)}>Go back</Button>
          </div>
        </div>
      }
      onClose={() => setShowConfirmation(false)}
    />
  );

  return (
    <Container>
      <div className='flex flex-col gap-5 pb-8'>
        <StrikeThroughText className='my-5'>
          Reschedule appointment
        </StrikeThroughText>
        <AppointmentPanel appointment={oldAppointment} showClient showService />
        <h2 className='font-semibold'>Select new appointment time:</h2>
        <Calendar
          initialData={upcomingAppointments}
          onAppointmentSelect={handleAppointmentSelect}
        />
        <Button className='lg:w-fit' onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
      {confirmationModal}
    </Container>
  );
};

export default Reschedule;
