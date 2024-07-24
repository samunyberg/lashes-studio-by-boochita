import { formatTimeAgo, isBookedLessThanOneHourAgo } from '@/app/lib/dates';
import { AppointmentWithData } from '@/app/lib/types';
import AppointmentPanel from '@/components/common/appointments/appointmentPanel/AppointmentPanel';
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
    <div className='flex items-center gap-1'>
      <GoDot />
      <span>{timeAgo}</span>
    </div>
  );

  return (
    <div
      key={appointment.id}
      className='flex cursor-pointer flex-col gap-3 font-medium'
      onClick={() => router.push(`/admin/appointments/${appointment.id}`)}
    >
      <div className='flex items-center'>
        {timeStamp()}
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
