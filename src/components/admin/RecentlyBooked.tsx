'use client';

import AppointmentPanel from '../common/appointments/AppointmentPanel';
import { AppointmentWithAllData } from './Today';

interface Props {
  appointments: AppointmentWithAllData[];
}

const RecentlyBooked = ({ appointments }: Props) => {
  if (appointments.length === 0)
    return <div>No new bookings within a week.</div>;

  return (
    <div className='flex flex-col gap-2'>
      {appointments.map((app) => (
        <AppointmentPanel key={app.id} appointment={app} />
      ))}
    </div>
  );
};

export default RecentlyBooked;
