import { Appointment } from '@prisma/client';
import CalendarDay from './CalendarDay';

interface Props {
  currentDate: Date;
  selectedMonth: number;
  onSelectedDate: (date: Date) => void;
  onShowExpandedDay: () => void;
  appointments: Appointment[];
}

const CalendarDays = ({
  currentDate,
  selectedMonth,
  onSelectedDate,
  onShowExpandedDay,
  appointments,
}: Props) => {
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, selectedMonth, 0).getDay();

  const lastMonthDays = [];
  const currentMonthDays = [];

  // Days before the first day of the current calendar month:
  for (let i = 0; i < firstDayOfMonth; i++) {
    lastMonthDays.push(i);
  }

  // Days of the current calendar month:
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  return (
    <div className='grid grid-cols-7 bg-bgSoft shadow'>
      {lastMonthDays.map((day) => (
        <div key={day} className='min-h-16 md:min-h-fit' />
      ))}
      {currentMonthDays.map((day) => (
        <CalendarDay
          key={day}
          index={day}
          currentDate={currentDate}
          selectedMonth={selectedMonth}
          appointments={appointments}
          onSelectDate={onSelectedDate}
          onShowExpandedDay={onShowExpandedDay}
        />
      ))}
    </div>
  );
};

export default CalendarDays;
