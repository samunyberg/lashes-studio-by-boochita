import { AppointmentWithAllData } from '@/app/lib/types';
import { Appointment } from '@prisma/client';
import AppointmentPanel from '../common/appointments/AppointmentPanel';

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
}

const AdminExpandedDayContent = ({ selectedDate, appointments }: Props) => {
  const appointmentsByDate = appointments.filter(
    (app) =>
      new Date(app.dateTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className='flex w-full flex-col gap-4 p-2 '>
      {appointmentsByDate.length === 0 && (
        <h2 className='mb-2 p-4 font-medium'>No appointments for this day.</h2>
      )}
      {appointmentsByDate.map((app: Appointment) => (
        <AppointmentPanel
          key={app.id}
          appointment={app as AppointmentWithAllData}
          showDate={false}
        />
      ))}
    </div>
  );
};

export default AdminExpandedDayContent;
