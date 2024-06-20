import BookingDataContext from '@/contexts/bookingDataContext';
import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { useContext } from 'react';
import { FaRegClock } from 'react-icons/fa';
import AppointmentStatusBadge from '../common/AppointmentStatusBadge';

interface Props {
  appointment: Appointment;
  onShowExpandedDay: () => void;
}

const ExpandedDayAppointment = ({ appointment, onShowExpandedDay }: Props) => {
  const { bookingData, setBookingData } = useContext(BookingDataContext);

  return (
    <div
      key={appointment.id}
      className={cn(
        `flex h-14 w-full items-center justify-between border-l-4 border-accent px-4 py-2 shadow`,
        {
          'pointer-events-none cursor-not-allowed opacity-70 shadow-none':
            appointment.status !== 'AVAILABLE',
        }
      )}
      onClick={() => {
        if (appointment.status !== 'AVAILABLE') return;
        setBookingData({ ...bookingData, appointment });
        onShowExpandedDay();
      }}
    >
      <span className='flex items-center gap-2'>
        <FaRegClock className='size-4' />
        <span>
          {appointment.dateTime.toLocaleTimeString('fi-FI', {
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
