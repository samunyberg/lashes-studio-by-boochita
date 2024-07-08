'use client';

import { Appointment } from '@prisma/client';
import { useState } from 'react';
import AdminExpandedDayContent from './AdminExpandedDayContent';
import CalendarDays from './CalendarDays';
import CalendarHeaderRow from './CalendarHeaderRow';
import ClientExpandedDayContent from './ClientExpandedDayContent';
import ExpandedDay from './ExpandedDay';
import Legend from './Legend';
import MonthSelector from './MonthSelector';

interface Props {
  appointments: Appointment[];
  admin?: boolean;
}

const Calendar = ({ appointments, admin = false }: Props) => {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [showExpandedDay, setShowExpandedDay] = useState(false);

  const handleShowExpandedDay = () => {
    setShowExpandedDay(!showExpandedDay);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
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
      {!admin && <Legend />}
      <ExpandedDay
        selectedDate={selectedDate}
        showExpandedDay={showExpandedDay}
        onShowExpandedDay={handleShowExpandedDay}
      >
        {admin ? (
          <AdminExpandedDayContent
            appointments={appointments}
            selectedDate={selectedDate}
          />
        ) : (
          <ClientExpandedDayContent
            appointments={appointments}
            selectedDate={selectedDate}
            onShowExpandedDay={handleShowExpandedDay}
          />
        )}
      </ExpandedDay>
    </div>
  );
};

export default Calendar;
