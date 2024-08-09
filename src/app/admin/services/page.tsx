import ServiceTable from '@/components/admin/services/ServiceTable';
import { PaginationData } from '@/components/Pagination';
import { getServices } from '@/lib/db/services';

interface Props {
  searchParams: { pageSize: string; pageNumber: string };
}

const AdminServicesPage = async ({
  searchParams: { pageNumber, pageSize },
}: Props) => {
  const pagination: PaginationData = {
    pageNumber: parseInt(pageNumber) || 1,
    pageSize: parseInt(pageSize) || 10,
  };

  const { services, count } = await getServices(pagination);

  return <ServiceTable services={services} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminServicesPage;
