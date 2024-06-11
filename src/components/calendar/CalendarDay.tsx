import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import { Dispatch, SetStateAction } from 'react';
import AvailabilityIndicator from './AvailabilityIndicator';

interface Props {
  index: number;
  currentDate: Date;
  selectedMonth: number;
  appointments: Appointment[];
  onSelect: Dispatch<SetStateAction<Date>>;
  expandDay: Dispatch<SetStateAction<boolean>>;
}

const CalendarDay = ({
  index,
  onSelect,
  expandDay,
  selectedMonth,
  currentDate,
  appointments,
}: Props) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const date = new Date(currentYear, selectedMonth, index);

  const isPassedDay =
    currentMonth === selectedMonth && currentDate.getDate() > index;

  const isCurrentDay =
    currentMonth === selectedMonth && currentDate.getDate() === index;

  const filteredAppointments = appointments.filter(
    (app) => app.date.toDateString() === date.toDateString()
  );

  const dayHasAvailableAppointments = () => {
    const availableAppointment = filteredAppointments.find(
      (app) => app.status === 'AVAILABLE'
    );

    return !!availableAppointment;
  };

  return (
    <div
      key={index}
      className={cn(
        'min-h-16 cursor-pointer border border-white/30 p-4 font-medium transition-all hover:bg-secondary md:min-h-fit lg:p-6',
        {
          'border-2 border-accent': isCurrentDay,
          'pointer-events-none text-gray-400': isPassedDay,
        }
      )}
      onClick={() => {
        onSelect(new Date(currentYear, selectedMonth, index));
        expandDay(true);
      }}
    >
      <div className='flex flex-col items-center justify-between gap-1 text-xs md:flex-row md:gap-0'>
        <span>{index}</span>
        <AvailabilityIndicator
          dayHasAvailableAppointments={dayHasAvailableAppointments()}
          isPassedDay={isPassedDay}
        />
      </div>
    </div>
  );
};

export default CalendarDay;
