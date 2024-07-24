import { AppointmentWithData } from '@/app/lib/types';
import { Appointment } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';

interface Props {
  appointment: Appointment;
  onShowExpandedDay: () => void;
  onAppointmentSelect: (app: Appointment | AppointmentWithData) => void;
}

const ExpandedDayAppointment = ({
  appointment,
  onShowExpandedDay,
  onAppointmentSelect,
}: Props) => {
  const isBookable = () => {
    const currentTime = new Date();
    const oneHourInMS = 3_600_000;

    return (
      appointment.status === 'AVAILABLE' &&
      new Date(appointment.dateTime).getTime() - currentTime.getTime() >=
        oneHourInMS
    );
  };

  return (
    <div
      key={appointment.id}
      className={cn({
        'pointer-events-none cursor-not-allowed opacity-70': !isBookable(),
      })}
      onClick={() => {
        if (!isBookable()) return;
        onAppointmentSelect(appointment);
        onShowExpandedDay();
      }}
    >
      <AppointmentPanel
        appointment={appointment}
        showDate={false}
        showStatusBadge
      />
    </div>
  );
};

export default ExpandedDayAppointment;
