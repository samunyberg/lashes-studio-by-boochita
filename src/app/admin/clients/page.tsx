import ClientList from '@/components/admin/ClientList';
import { getClients, getClientsCount } from '@/lib/db/clients';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminClientsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const currentPage = parseInt(pageNumber) || 1;
  const itemsPerPage = parseInt(pageSize) || 10;

  const paginatedClients = await getClients(currentPage, itemsPerPage);

  const itemsCount = await getClientsCount();

  return <ClientList clients={paginatedClients} itemsCount={itemsCount} />;
};

export const dynamic = 'force-dynamic';

export default AdminClientsPage;
