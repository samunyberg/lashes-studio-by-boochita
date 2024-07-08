import { Appointment } from '@prisma/client';
import Label from '../common/Label';
import ExpandedDayAppointment from './ExpandedDayAppointment';

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
  onShowExpandedDay: () => void;
}

const ClientExpandedDayContent = ({
  selectedDate,
  onShowExpandedDay,
  appointments,
}: Props) => {
  const appointmentsByDate = appointments.filter(
    (app) => app.dateTime.toDateString() === selectedDate.toDateString()
  );

  return (
    <>
      <div className='px-4 py-3'>
        <h2 className='mb-2 font-medium'>
          {appointmentsByDate.length > 0 ? (
            <Label labelId='click_appointment_to_select' />
          ) : (
            <Label labelId='no_appointments_for_this_day' />
          )}
        </h2>
      </div>
      <div className='flex w-full flex-col gap-4 p-2 '>
        {appointmentsByDate.map((app: Appointment) => (
          <ExpandedDayAppointment
            key={app.id}
            appointment={app}
            onShowExpandedDay={onShowExpandedDay}
          />
        ))}
      </div>
    </>
  );
};

export default ClientExpandedDayContent;
