import AppointmentList from '@/components/admin/appointments/AppointmentList';
import { PaginationInfo } from '@/components/Pagination';
import { getAppointmentsBySearchTerm } from '@/lib/db/appointments';

export interface AppointmentSearchQuery {
  term: string | null;
  date: string | null;
}

interface Props {
  searchParams: {
    pageNumber: string;
    pageSize: string;
    term: string | null;
    date: string | null;
  };
}

const AdminSearchAppointmentsPage = async ({ searchParams }: Props) => {
  const pagination: PaginationInfo = {
    pageNumber: parseInt(searchParams.pageNumber) || 1,
    pageSize: parseInt(searchParams.pageSize) || 10,
  };

  const query: AppointmentSearchQuery = {
    term: searchParams.term,
    date: searchParams.date,
  };

  const { appointments, count } = await getAppointmentsBySearchTerm(
    query,
    pagination
  );

  return <AppointmentList appointments={appointments} itemsCount={count} />;
};

export default AdminSearchAppointmentsPage;
