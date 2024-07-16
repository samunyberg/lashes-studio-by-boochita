import { Appointment } from '@prisma/client';
import Panel from '../common/Panel';
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
    <Panel className='grid h-full grid-cols-7 !shadow-none'>
      {lastMonthDays.map((day) => (
        <div key={day} />
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
    </Panel>
  );
};

export default CalendarDays;
