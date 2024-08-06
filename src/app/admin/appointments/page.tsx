import AppointmentList from '@/components/admin/appointments/AppointmentList';
import { PaginationInfo } from '@/components/Pagination';
import { getAppointments } from '@/lib/db/appointments';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminAppointmentsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationInfo = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { appointments, count } = await getAppointments(pagination);

  return <AppointmentList appointments={appointments} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
