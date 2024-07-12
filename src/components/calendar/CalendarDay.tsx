import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import AvailabilityIndicator from './AvailabilityIndicator';

interface Props {
  index: number;
  currentDate: Date;
  selectedMonth: number;
  appointments: Appointment[];
  onSelectDate: (date: Date) => void;
  onShowExpandedDay: () => void;
}

const CalendarDay = ({
  index,
  onSelectDate,
  onShowExpandedDay,
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

  const appointmentsByDate = appointments.filter(
    (app) => new Date(app.dateTime).toDateString() === date.toDateString()
  );

  const dayHasAvailableAppointments = () => {
    const availableAppointment = appointmentsByDate.find(
      (app) => app.status === 'AVAILABLE'
    );

    return !!availableAppointment;
  };

  return (
    <div
      key={index}
      className={cn(
        'flex h-full cursor-pointer flex-col items-center justify-between border border-black/5 p-4 text-sm font-medium transition-all hover:bg-bgSofter lg:flex-row',
        {
          'border-2 border-accent': isCurrentDay,
          'pointer-events-none text-gray-400': isPassedDay,
        }
      )}
      onClick={() => {
        onSelectDate(new Date(currentYear, selectedMonth, index));
        onShowExpandedDay();
      }}
    >
      <span>{index}</span>
      <AvailabilityIndicator
        dayHasAvailableAppointments={dayHasAvailableAppointments()}
        isPassedDay={isPassedDay}
      />
    </div>
  );
};

export default CalendarDay;
