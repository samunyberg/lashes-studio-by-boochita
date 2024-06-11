import { Appointment } from '@prisma/client';
import AppointmentStatusBadge from '../common/AppointmentStatusBadge';

interface Props {
  appointment: Appointment;
  onSelectAppointmentId: (id: number) => void;
}

const ExpandedDayAppointment = ({
  appointment,
  onSelectAppointmentId,
}: Props) => {
  return (
    <div
      key={appointment.id}
      className={`${appointment.status !== 'AVAILABLE' ? 'pointer-events-none' : ''} flex h-14 w-full items-center justify-between border border-accent px-4 py-2 shadow`}
      onClick={() => {
        if (appointment.status !== 'AVAILABLE') return;
        onSelectAppointmentId(appointment.id);
      }}
    >
      <span>
        {appointment.time.toLocaleTimeString('fi-FI', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
      <AppointmentStatusBadge status={appointment.status} />
    </div>
  );
};

export default ExpandedDayAppointment;
