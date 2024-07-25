'use client';

import useLocale from '@/hooks/useLocale';
import { formatDate, groupAppointmentsByMonth } from '@/lib/dates';
import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../common/Button';
import GoBackLink from '../common/GoBackLink';
import Label from '../common/Label';

interface Props {
  appointments: AppointmentWithData[];
  onAppointmentClick?: (app: AppointmentWithData) => void;
}

const AppointmentHistory = ({ appointments, onAppointmentClick }: Props) => {
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
    <>
      <div className='mb-5'>
        <GoBackLink />
      </div>
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
                <div
                  key={app.id}
                  onClick={() => onAppointmentClick && onAppointmentClick(app)}
                >
                  <AppointmentPanel appointment={app} showService showPrice />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AppointmentHistory;
