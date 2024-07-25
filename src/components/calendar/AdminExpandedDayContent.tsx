import { AppointmentWithData } from '@/lib/types';
import { Appointment } from '@prisma/client';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
  onAppointmentSelect: (app: Appointment | AppointmentWithData) => void;
}

const AdminExpandedDayContent = ({
  selectedDate,
  appointments,
  onAppointmentSelect,
}: Props) => {
  const appointmentsByDate = appointments?.filter(
    (app) =>
      new Date(app.dateTime).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className='flex w-full flex-col gap-4 p-2 '>
      {appointmentsByDate?.length === 0 && (
        <h2 className='mb-2 p-4 font-medium'>No appointments for this day.</h2>
      )}
      {appointmentsByDate?.map((app: Appointment) => (
        <div key={app.id} onClick={() => onAppointmentSelect(app)}>
          {app.status === 'AVAILABLE' || app.status === 'UNAVAILABLE' ? (
            <AppointmentPanel
              appointment={app as AppointmentWithData}
              showDate={false}
              showStatusBadge
            />
          ) : (
            <AppointmentPanel
              appointment={app as AppointmentWithData}
              showDate={false}
              showClient
              showService
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminExpandedDayContent;
