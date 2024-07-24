import {
  getAppointmentById,
  getUpcomingAppointments,
} from '@/app/lib/db/appointments';
import Reschedule from '@/components/admin/Reschedule';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const ReschedulePage = async ({ params }: Props) => {
  const appointment = await getAppointmentById(parseInt(params.id));

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
