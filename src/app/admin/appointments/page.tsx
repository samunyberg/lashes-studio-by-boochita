import AppointmentList from '@/components/admin/AppointmentList';
import { getAppointments, getAppointmentsCount } from '@/lib/db/appointments';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminAppointmentsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const currentPage = parseInt(pageNumber) || 1;
  const itemsPerPage = parseInt(pageSize) || 10;

  const itemsCount = await getAppointmentsCount();

  const paginatedAppointments = await getAppointments(
    currentPage,
    itemsPerPage
  );

  return (
    <AppointmentList
      appointments={paginatedAppointments}
      itemsCount={itemsCount}
    />
  );
};

export const dynamic = 'force-dynamic';

export default AdminAppointmentsPage;
