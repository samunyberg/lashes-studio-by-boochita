import prisma from '@/prisma/client';
import { ClientWithAppointments } from '../types';

export async function getClientById(id: string) {
  const client = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      appointments: {
        include: { service: true, serviceOption: true },
      },
    },
  });

  return client as ClientWithAppointments;
}

export async function getClientWithUpcomingAppointments(id: string) {
  const client = await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      appointments: {
        where: {
          dateTime: { gt: new Date() },
        },
        include: { service: true, serviceOption: true },
      },
    },
  });

  return client as ClientWithAppointments;
}
