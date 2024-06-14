import BookingDataContext from '@/contexts/bookingDataContext';
import { Appointment } from '@prisma/client';
import { useContext } from 'react';
import { Calendar } from '../calendar/Calendar';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { FaRegClock } from 'react-icons/fa6';

interface Props {
  appointments: Appointment[];
}

const Step1 = ({ appointments }: Props) => {
  return <Calendar appointments={appointments} />;
};

export default Step1;
