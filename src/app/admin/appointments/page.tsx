import { getAppointments } from '@/app/lib/db/appointments';
import { AppointmentWithAllData } from '@/app/lib/types';
import AppointmentList from '@/components/admin/AppointmentList';

const AdminAppointmentsPage = async () => {
  const appointments = (await getAppointments()) as AppointmentWithAllData[];

  return <AppointmentList appointments={appointments} />;
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
