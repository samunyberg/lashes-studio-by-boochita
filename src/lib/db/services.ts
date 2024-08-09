import { PaginationData } from '@/components/Pagination';
import prisma from '@/prisma/client';
import { ServiceWithServiceOptions } from '../types';

export async function getServices({
  pageNumber,
  pageSize,
}: PaginationData): Promise<{
  services: ServiceWithServiceOptions[];
  count: number;
}> {
  const [services, count] = await Promise.all([
    prisma.service.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: { serviceOptions: true },
    }),
    prisma.service.count(),
  ]);

  return { services, count };
}

export async function getServiceById(id: number) {
  const service = await prisma.service.findFirst({
    where: { id },
    include: { serviceOptions: true },
  });

  return service as ServiceWithServiceOptions;
}

export async function getServiceOptionByServiceIdAndOptionId(
  serviceId: number,
  optionId: number
) {
  const serviceOption = await prisma.serviceOption.findFirst({
    where: { serviceId: serviceId, id: optionId },
  });

  return serviceOption;
}
