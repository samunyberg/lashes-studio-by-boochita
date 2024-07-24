import prisma from '@/prisma/client';
import { ClientWithAppointments } from '../types';

export async function getClientById(id: string) {
  const client = await prisma.user.findUnique({
    where: { id },
    include: {
      appointments: { include: { service: true, serviceOption: true } },
    },
  });

  return client as ClientWithAppointments;
}
