'use client';

import { AppointmentWithData } from '@/lib/types';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  appointments: AppointmentWithData[];
}

const MyAppointments = ({ appointments }: Props) => {
  return (
    <div>
      <h2 className='mb-5 text-xl font-semibold'>
        <Label labelId='upcoming_appointments' />
      </h2>
      {appointments.length === 0 ? (
        <Panel className='p-4'>
          <Label labelId='no_upcoming_appointments' />
        </Panel>
      ) : (
        <div className='flex flex-col gap-3'>
          {appointments.map((app) => (
            <AppointmentPanel key={app.id} appointment={app} showService />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
