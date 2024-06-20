'use client';

import { Appointment } from '@prisma/client';
import { useState } from 'react';
import CalendarDays from './CalendarDays';
import CalendarHeaderRow from './CalendarHeaderRow';
import ExpandedDay from './ExpandedDay';
import Legend from './Legend';
import MonthSelector from './MonthSelector';

interface Props {
  appointments: Appointment[];
}

export const Calendar = ({ appointments }: Props) => {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [showExpandedDay, setShowExpandedDay] = useState(false);

  const appointmentsByDate = appointments.filter(
    (app) => app.dateTime.toDateString() === selectedDate.toDateString()
  );

  const handleShowExpandedDay = () => {
    setShowExpandedDay(!showExpandedDay);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className='relative'>
      <MonthSelector
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
      />
      <CalendarHeaderRow />
      <CalendarDays
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        onSelectedDate={handleSelectDate}
        appointments={appointments}
        onShowExpandedDay={handleShowExpandedDay}
      />
      <Legend />
      <ExpandedDay
        selectedDate={selectedDate}
        appointments={appointmentsByDate}
        showExpandedDay={showExpandedDay}
        onShowExpandedDay={handleShowExpandedDay}
      />
    </div>
  );
};
