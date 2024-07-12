'use client';

import { Appointment } from '@prisma/client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminExpandedDayContent from './AdminExpandedDayContent';
import CalendarDays from './CalendarDays';
import CalendarHeaderRow from './CalendarHeaderRow';
import ClientExpandedDayContent from './ClientExpandedDayContent';
import ExpandedDay from './ExpandedDay';
import Legend from './Legend';
import MonthSelector from './MonthSelector';

interface Props {
  admin?: boolean;
}

const Calendar = ({ admin = false }: Props) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [showExpandedDay, setShowExpandedDay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Appointment[]>('/api/appointments');
        setAppointments(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleShowExpandedDay = () => {
    setShowExpandedDay(!showExpandedDay);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  if (isLoading) return <div className='p-5'>Loading...</div>;

  return (
    <div className='flex h-full flex-col'>
      <div className='h-[50px]'>
        <MonthSelector
          currentDate={currentDate}
          selectedMonth={selectedMonth}
          onSelect={setSelectedMonth}
        />
      </div>
      <div className='h-[25px]'>
        <CalendarHeaderRow />
      </div>
      <div className='flex-1'>
        <CalendarDays
          currentDate={currentDate}
          selectedMonth={selectedMonth}
          onSelectedDate={handleSelectDate}
          appointments={appointments}
          onShowExpandedDay={handleShowExpandedDay}
        />
      </div>
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
