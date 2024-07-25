import prisma from '@/prisma/client';
import { formatDate } from '../dates';
import { AppointmentWithData } from '../types';

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

export async function getAppointments(): Promise<AppointmentWithData[]> {
  const appointments = await prisma.appointment.findMany({
    include: {
      service: true,
      serviceOption: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return appointments;
}

export async function getUpcomingAppointments(): Promise<
  AppointmentWithData[]
> {
  const appointments = await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: todayStart,
      },
    },
    include: {
      service: true,
      serviceOption: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return appointments;
}

export async function getRecentlyBookedAppointments(): Promise<
  AppointmentWithData[]
> {
  const threeDaysAgoStart = new Date(
    todayStart.getTime() - 3 * 24 * 60 * 60 * 1000
  );

  const appointments = await prisma.appointment.findMany({
    where: {
      bookedAt: {
        gte: threeDaysAgoStart,
      },
      status: 'BOOKED',
    },
    include: {
      service: true,
      serviceOption: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
    orderBy: { bookedAt: 'desc' },
  });

  return appointments;
}

export async function getTodaysAppointments(): Promise<AppointmentWithData[]> {
  const appointments = await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
    include: {
      service: true,
      serviceOption: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return appointments;
}

export async function getMonthlyAppointmentsCount() {
  const now = new Date();
  const year = now.getFullYear();

  const monthlyCounts = [];

  const getFirstAndLastDateOfMonth = (year: number, month: number) => {
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);
    return { firstDate, lastDate };
  };

  for (let month = 0; month <= now.getMonth(); month++) {
    const { firstDate, lastDate } = getFirstAndLastDateOfMonth(year, month);

    const count = await prisma.appointment.count({
      where: {
        dateTime: {
          gte: firstDate,
          lte: lastDate,
        },
        status: 'BOOKED',
      },
    });

    monthlyCounts.push({
      month: formatDate(firstDate, 'en-FI', { month: 'long' }),
      count,
    });
  }

  return monthlyCounts;
}

export async function getAppointmentById(
  id: number
): Promise<AppointmentWithData | null> {
  const appointment = await prisma.appointment.findFirst({
    where: { id },
    include: {
      service: true,
      serviceOption: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  });

  return appointment;
}

export async function getPassedAppointmentsByClientId(id: string) {
  const passedAppointments = await prisma.appointment.findMany({
    where: {
      userId: id,
      dateTime: { lt: new Date() },
    },
    include: { service: true, serviceOption: true },
    orderBy: { dateTime: 'desc' },
  });

  return passedAppointments as AppointmentWithData[];
}
