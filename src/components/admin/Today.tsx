'use client';

import useLanguage from '@/hooks/useLanguage';
import { Appointment, Service, ServiceOption } from '@prisma/client';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Button from '../common/Button';

export type AppointmentWithAllData = Appointment & {
  service: Service | null;
  serviceOption: ServiceOption | null;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

interface Props {
  todaysAppointments: AppointmentWithAllData[];
}

const Today = ({ todaysAppointments }: Props) => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Button
          variant='accent'
          className='mt-4 !hidden text-sm lg:inline'
          onClick={() => router.push('/admin/appointments')}
        >
          Show All
        </Button>
      </div>
      {todaysAppointments.length === 0 ? (
        <div className='rounded-sm bg-bgSoft px-2 py-4 font-medium shadow'>
          No appointments for today. Enjoy your day off!
        </div>
      ) : (
        <div className='mb-6 flex flex-col gap-2 lg:flex-row'>
          {todaysAppointments.map((app) => (
            <AppointmentPanel key={app.id} appointment={app} showDate={false} />
          ))}
        </div>
      )}
      <Button
        variant='accent'
        className='mt-5 w-full lg:hidden'
        onClick={() => router.push('/admin/appointments')}
      >
        Show all appointments
      </Button>
    </>
  );
};

export default Today;
