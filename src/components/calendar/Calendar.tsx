'use client';

import { Appointment } from '@prisma/client';
import { useState } from 'react';
import CalendarDays from './CalendarDays';
import CalendarHeaderRow from './CalendarHeaderRow';
import ExpandedDay from './ExpandedDay';
import Legend from './Legend';
import MonthSelector from './MonthSelector';

export const Calendar = ({ appointments }: { appointments: Appointment[] }) => {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [showExpandedDay, setShowExpandedDay] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    number | null
  >(null);

  const filteredAppointments = appointments.filter(
    (app) => app.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className='relative'>
      {/* TODO: Remove this when not needed for testing */}
      {selectedAppointmentId}
      <MonthSelector
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
      />
      <CalendarHeaderRow />
      <CalendarDays
        currentDate={currentDate}
        selectedMonth={selectedMonth}
        setSelectedDate={setSelectedDate}
        appointments={appointments}
        setShowExpandedDay={setShowExpandedDay}
      />
      <Legend />
      <ExpandedDay
        selectedDate={selectedDate}
        appointments={filteredAppointments}
        showExpandedDay={showExpandedDay}
        setShowExpandedDay={setShowExpandedDay}
        onSelectAppointmentId={setSelectedAppointmentId}
      />
    </div>
  );
};
