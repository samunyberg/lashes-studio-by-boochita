'use client';

import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../common/Button';
import Label from '../common/Label';

interface Props {
  appointments: AppointmentWithData[];
  clientId: string;
}

const MyAppointments = ({ appointments, clientId }: Props) => {
  const router = useRouter();

  return (
    <div>
      <h2 className='mb-5 text-xl font-semibold'>
        <Label labelId='upcoming_appointments' />
      </h2>
      {appointments.length === 0 ? (
        <div className='px-2 py-4 font-medium'>
          <Label labelId='no_upcoming_appointments' />
        </div>
      ) : (
        <div className='mb-5 flex flex-col gap-3'>
          {appointments.map((app) => (
            <AppointmentPanel key={app.id} appointment={app} showService />
          ))}
        </div>
      )}
      <Button
        variant='primary'
        className='w-full lg:float-end lg:w-fit'
        onClick={() => router.push(`/account/${clientId}/appointment-history`)}
      >
        <Label labelId='show_appointment_history' />
      </Button>
    </div>
  );
};

export default MyAppointments;
