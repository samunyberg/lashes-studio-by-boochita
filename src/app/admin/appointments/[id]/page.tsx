import {
  getAppointmentById
} from '@/app/lib/db/appointments';
import AppointmentDetails from '@/components/admin/AppointmentDetails';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AppointmentDetailPage = async ({ params }: Props) => {
  const appointment = await getAppointmentById(parseInt(params.id));

  if (!appointment) notFound();

  return <AppointmentDetails appointment={appointment} />;
};

export default AppointmentDetailPage;
