import ServiceList from '@/components/admin/services/ServiceList';
import { ServiceWithServiceOptions } from '@/lib/types';
import prisma from '@/prisma/client';

const AdminServicesPage = async () => {
  const services = await prisma.service.findMany({
    include: { serviceOptions: true },
  });

  return (
    <div>
      <h1 className='mb-5 text-xl font-semibold'>Services</h1>
      <ServiceList services={services as ServiceWithServiceOptions[]} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default AdminServicesPage;
