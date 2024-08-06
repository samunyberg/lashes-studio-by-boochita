import ServiceOptionDetails from '@/components/admin/services/ServiceOptionDetails';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    serviceId: string;
    serviceOptionId: string;
  };
}

const ServiceOptionDetailsPage = async ({
  params: { serviceId, serviceOptionId },
}: Props) => {
  const serviceOption = await prisma.serviceOption.findFirst({
    where: { serviceId: parseInt(serviceId), id: parseInt(serviceOptionId) },
  });

  if (!serviceOption) return notFound();

  return <ServiceOptionDetails serviceOption={serviceOption} />;
};

export default ServiceOptionDetailsPage;
