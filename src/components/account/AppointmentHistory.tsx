'use client';

import { formatDate, groupAppointmentsByMonth } from '@/app/lib/dates';
import { AppointmentWithData } from '@/app/lib/types';
import useLocale from '@/hooks/useLocale';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../common/Button';
import Label from '../common/Label';

interface Props {
  appointments: AppointmentWithData[];
}

const AppointmentHistory = ({ appointments }: Props) => {
  const router = useRouter();
  const locale = useLocale();

  if (appointments.length === 0)
    return (
      <div>
        <p className='mb-8 font-medium'>Ei menneitä varauksia.</p>
        <Button className='w-full' onClick={() => router.back()}>
          <Label labelId='back' />
        </Button>
      </div>
    );

  const groupedAppointments = groupAppointmentsByMonth(appointments);

  return (
    <div className='pb-5'>
      {Object.keys(groupedAppointments).map((month, index) => {
        return (
          <div key={index}>
            <span className='text-lg font-semibold'>
              {formatDate(new Date(month), locale, {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <div className='mb-8 mt-2 flex flex-col gap-2'>
              {groupedAppointments[month].map((app) => (
                <AppointmentPanel
                  key={app.id}
                  appointment={app}
                  showClient={false}
                  showPrice={true}
                />
              ))}
            </div>
          </div>
        );
      })}
      <Button className='w-full' onClick={() => router.back()}>
        <Label labelId='back' />
      </Button>
    </div>
  );
};

export default AppointmentHistory;
