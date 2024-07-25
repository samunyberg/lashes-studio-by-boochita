import AppointmentList from '@/components/admin/AppointmentList';
import { getAppointments } from '@/lib/db/appointments';
import { AppointmentWithData } from '@/lib/types';

const AdminAppointmentsPage = async () => {
  const appointments = (await getAppointments()) as AppointmentWithData[];

  return <AppointmentList appointments={appointments} />;
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
