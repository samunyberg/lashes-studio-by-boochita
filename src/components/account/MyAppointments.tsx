'use client';

import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
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
    </div>
  );
};

export default MyAppointments;
