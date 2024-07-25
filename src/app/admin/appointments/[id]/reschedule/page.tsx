import Reschedule from '@/components/admin/Reschedule';
import {
  getAppointmentById,
  getUpcomingAppointments,
} from '@/lib/db/appointments';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const ReschedulePage = async ({ params: { id } }: Props) => {
  const appointment = await getAppointmentById(parseInt(id));

  if (!appointment) notFound();

  const upcomingAppointments = await getUpcomingAppointments();

  return (
    <Reschedule
      oldAppointment={appointment}
      upcomingAppointments={upcomingAppointments}
    />
  );
};

export default ReschedulePage;
