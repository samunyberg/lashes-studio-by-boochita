import prisma from '@/prisma/client';
import { formatDate } from '../dates';

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

export async function getAppointments() {
  const appointments = await prisma.appointment.findMany({
    include: { client: true, service: true, serviceOption: true },
  });

  return appointments;
}

export async function getUpcomingAppointments() {
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
        },
      },
    },
  });

  return appointments;
}

export async function getRecentlyBookedAppointments() {
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
        },
      },
    },
    orderBy: { bookedAt: 'desc' },
  });

  return appointments;
}

export async function getTodaysAppointments() {
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
