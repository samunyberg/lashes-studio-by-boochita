import AppointmentPanel from '@/components/common/appointments/appointmentPanel/AppointmentPanel';
import { formatTimeAgo, isBookedLessThanOneHourAgo } from '@/lib/dates';
import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoDot } from 'react-icons/go';
import NewBadge from './NewBadge';

interface Props {
  appointment: AppointmentWithData;
}

const RecentlyBookedItem = ({ appointment }: Props) => {
  const router = useRouter();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatTimeAgo(appointment.bookedAt!));

    const intervalId = setInterval(() => {
      setTimeAgo(formatTimeAgo(appointment.bookedAt!));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const timeStamp = () => (
    <div className='flex items-center'>
      <GoDot />
      <span>{timeAgo}</span>
    </div>
  );

  const type = () => (
    <div className='ml-2'>
      {appointment.rescheduledAt && <span>{`(rescheduled)`}</span>}
    </div>
  );

  return (
    <div
      key={appointment.id}
      className='flex cursor-pointer flex-col gap-1 font-medium'
      onClick={() => router.push(`/admin/appointments/${appointment.id}`)}
    >
      <div className='flex items-center'>
        {timeStamp()}
        {type()}
        {isBookedLessThanOneHourAgo(appointment.bookedAt!) && (
          <span className='ml-auto'>
            <NewBadge />
          </span>
        )}
      </div>
      <AppointmentPanel appointment={appointment} showClient showService />
    </div>
  );
};

export default RecentlyBookedItem;
