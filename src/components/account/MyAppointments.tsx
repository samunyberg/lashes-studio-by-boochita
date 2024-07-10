'use client';

import { AppointmentWithService } from '@/app/lib/types';
import useLanguage from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import AppointmentPanel from '../common/appointments/AppointmentPanel';

interface Props {
  appointments: AppointmentWithService[];
}

const MyAppointments = ({ appointments }: Props) => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  return (
    <div>
      <h2 className='mb-2 text-lg font-semibold'>Tulevat varaukset</h2>
      {appointments.length === 0 ? (
        <div className='px-2 py-4 font-medium'>Ei tulevia varauksia.</div>
      ) : (
        <div className='mb-4 flex flex-col gap-3'>
          {appointments.map((app) => (
            <AppointmentPanel
              key={app.id}
              appointment={app}
              showClient={false}
            />
          ))}
        </div>
      )}
      <Button
        variant='primary'
        className='w-full lg:float-end lg:w-fit'
        onClick={() => router.push('/account/appointment-history')}
      >
        Näytä varaushistoria
      </Button>
    </div>
  );
};

export default MyAppointments;
