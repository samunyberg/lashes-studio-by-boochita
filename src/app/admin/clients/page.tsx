import ClientList from '@/components/admin/clients/ClientList';
import { PaginationInfo } from '@/components/Pagination';
import { getClients } from '@/lib/db/clients';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminClientsPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationInfo = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { clients, count } = await getClients(pagination);

  return <ClientList clients={clients} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminClientsPage;
