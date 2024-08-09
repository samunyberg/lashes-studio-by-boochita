import ServiceOptionOverview from '@/components/admin/services/ServiceOptionOverview';
import {
  getServiceById,
  getServiceOptionByServiceIdAndOptionId,
} from '@/lib/db/services';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    serviceId: string;
    serviceOptionId: string;
  };
}

const AdminServiceOptionPage = async ({
  params: { serviceId, serviceOptionId },
}: Props) => {
  const serviceOption = await getServiceOptionByServiceIdAndOptionId(
    parseInt(serviceId),
    parseInt(serviceOptionId)
  );

  const associatedService = await getServiceById(parseInt(serviceId));

  if (!serviceOption) return notFound();

  return (
    <ServiceOptionOverview
      serviceOption={serviceOption}
      associatedServiceName={associatedService.name}
    />
  );
};

export default AdminServiceOptionPage;
