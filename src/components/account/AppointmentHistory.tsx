'use client';

import useLanguage from '@/hooks/useLanguage';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { AppointmentWithData } from './MyAppointments';

interface Props {
  appointments: AppointmentWithData[];
}

const AppointmentHistory = ({ appointments }: Props) => {
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  return (
    <div className='mb-4 flex flex-col gap-3'>
      {appointments.map((app) => (
        <div
          key={app.id}
          className='border-l-4 border-accent bg-bgSoft px-4 py-4 font-medium shadow'
        >
          <div className='flex flex-col gap-1 px-4'>
            <span className='flex items-center gap-2'>
              <FaRegCalendarCheck className='size-4' />
              {app.dateTime.toLocaleDateString(locale, {
                weekday: 'long',
                month: 'long',
                day: '2-digit',
              })}
            </span>
            <span className='flex items-center gap-2'>
              <FaRegClock className='size-4' />
              {app.dateTime.toLocaleTimeString(locale, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <span className='flex items-center gap-2'>
              <FaCheck className='size-3' />
              {app.service?.name}
            </span>
            <span className='flex items-center gap-2'>
              <FaCheck className='size-3' />
              {app.serviceOption?.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentHistory;
