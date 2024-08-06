import ServiceTable from '@/components/admin/services/ServiceTable';
import { getServices } from '@/lib/db/services';

const AdminServicesPage = async () => {
  const { services, count } = await getServices();

  return <ServiceTable services={services} itemsCount={count} />;
};

export const dynamic = 'force-dynamic';

export default AdminServicesPage;
