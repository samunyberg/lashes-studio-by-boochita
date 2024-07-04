import BookingDataContext from '@/contexts/bookingDataContext';
import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { useContext } from 'react';
import { FaRegClock } from 'react-icons/fa';
import AppointmentStatusBadge from '../common/AppointmentStatusBadge';
import useLanguage from '@/hooks/useLanguage';

interface Props {
  appointment: Appointment;
  onShowExpandedDay: () => void;
}

const ExpandedDayAppointment = ({ appointment, onShowExpandedDay }: Props) => {
  const { currentLanguage } = useLanguage();
  const { bookingData, setBookingData } = useContext(BookingDataContext);
  const locale = `${currentLanguage}-FI`;

  const isBookable = () => {
    const currentTime = new Date();
    const oneHourInMS = 3_600_000;

    return (
      appointment.status === 'AVAILABLE' &&
      appointment.dateTime.getTime() - currentTime.getTime() >= oneHourInMS
    );
  };

  return (
    <div
      key={appointment.id}
      className={cn(
        `flex h-14 w-full items-center justify-between border-l-4 border-accent px-4 py-2 shadow`,
        {
          'pointer-events-none cursor-not-allowed opacity-70 shadow-none':
            !isBookable(),
        }
      )}
      onClick={() => {
        if (!isBookable()) return;
        setBookingData({ ...bookingData, appointment });
        onShowExpandedDay();
      }}
    >
      <span className='flex items-center gap-2'>
        <FaRegClock className='size-4' />
        <span>
          {appointment.dateTime.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </span>
      <AppointmentStatusBadge status={appointment.status} />
    </div>
  );
};

export default ExpandedDayAppointment;
