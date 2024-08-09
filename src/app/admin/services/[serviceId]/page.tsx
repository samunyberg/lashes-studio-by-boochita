import ServiceOverview from '@/components/admin/services/ServiceOverview';
import { getServiceById } from '@/lib/db/services';

interface Props {
  params: { serviceId: string };
}

const AdminServicePage = async ({ params: { serviceId } }: Props) => {
  const service = await getServiceById(parseInt(serviceId));

  return <ServiceOverview service={service} />;
};

export default AdminServicePage;
