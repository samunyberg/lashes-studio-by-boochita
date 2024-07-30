import prisma from '@/prisma/client';
import { Client, ClientWithAppointments } from '../types';

export async function getClients(
  currentPage: number,
  pageSize: number
): Promise<Client[]> {
  const clients = await prisma.user.findMany({
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
  });

  return clients;
}

export async function getClientsCount(): Promise<number> {
  return await prisma.user.count();
}

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
