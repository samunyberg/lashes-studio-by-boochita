import AppointmentDetails from '@/components/admin/appointments/AppointmentDetails';
import { getAppointmentById } from '@/lib/db/appointments';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AppointmentDetailPage = async ({ params: { id } }: Props) => {
  const appointment = await getAppointmentById(parseInt(id));

  if (!appointment) notFound();

  return <AppointmentDetails appointment={appointment} />;
};

export default AppointmentDetailPage;
