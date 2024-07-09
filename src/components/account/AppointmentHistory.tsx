'use client';

import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Button from '../common/Button';
import Label from '../common/Label';
import { AppointmentWithData } from './MyAppointments';

interface Props {
  appointments: AppointmentWithData[];
}

const AppointmentHistory = ({ appointments }: Props) => {
  const router = useRouter();

  if (appointments.length === 0)
    return (
      <div>
        <p className='mb-8 font-medium'>Ei menneitä varauksia.</p>
        <Button className='w-full' onClick={() => router.back()}>
          <Label labelId='back' />
        </Button>
      </div>
    );

  return (
    <div className='pb-5'>
      <div className='mb-6 flex flex-col gap-2'>
        {appointments.map((app) => (
          <AppointmentPanel
            key={app.id}
            appointment={app}
            showClient={false}
            showPrice={true}
          />
        ))}
      </div>
      <Button className='w-full' onClick={() => router.back()}>
        <Label labelId='back' />
      </Button>
    </div>
  );
};

export default AppointmentHistory;
