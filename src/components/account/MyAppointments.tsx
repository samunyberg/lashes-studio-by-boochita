'use client';

import useLanguage from '@/hooks/useLanguage';
import { Appointment, Service, ServiceOption } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import Button from '../common/Button';

export type AppointmentWithData = Appointment & {
  service: Service | null;
  serviceOption: ServiceOption | null;
};

interface Props {
  appointments: AppointmentWithData[];
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
