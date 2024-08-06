import ServiceDetails from '@/components/admin/services/ServiceDetails';
import { getServiceById } from '@/lib/db/services';

interface Props {
  params: { serviceId: string };
}

const ServiceDetailsPage = async ({ params: { serviceId } }: Props) => {
  const service = await getServiceById(parseInt(serviceId));

  return <ServiceDetails service={service} />;
};

export default ServiceDetailsPage;
