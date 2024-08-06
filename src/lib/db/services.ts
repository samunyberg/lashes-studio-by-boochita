import prisma from '@/prisma/client';
import { ServiceWithServiceOptions } from '../types';

export async function getServices(): Promise<{
  services: ServiceWithServiceOptions[];
  count: number;
}> {
  const [services, count] = await Promise.all([
    prisma.service.findMany({
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
