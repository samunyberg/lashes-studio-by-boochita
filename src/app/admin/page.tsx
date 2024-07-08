import Navigation from '@/components/admin/Navigation';
import RecentlyBooked from '@/components/admin/RecentlyBooked';
import Today from '@/components/admin/Today';
import Calendar from '@/components/calendar/Calendar';
import prisma from '@/prisma/client';

const AdminHomePage = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysAppointments = await prisma.appointment.findMany({
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

  const threeDaysAgoStart = new Date(
    todayStart.getTime() - 3 * 24 * 60 * 60 * 1000
  );

  const recentlyBookedAppointments = await prisma.appointment.findMany({
    where: {
      bookedAt: {
        gte: threeDaysAgoStart,
      },
    },
    include: { service: true, serviceOption: true, client: true },
  });

  return (
    <div className='flex flex-col gap-5 pb-12'>
      <div>
        <Navigation />
      </div>
      <div>
        <h1 className='mb-5 w-full border-b border-accent text-xl font-semibold uppercase'>
          Today
        </h1>
        <Today todaysAppointments={todaysAppointments} />
      </div>
      <div className='mt-8'>
        <h2 className='mb-5 w-full border-b border-accent text-xl font-semibold uppercase'>
          Calendar
        </h2>
        <Calendar admin appointments={appointments} />
      </div>
      <div className='mt-8'>
        <h1 className='mb-5 w-full border-b border-accent text-xl font-semibold uppercase'>
          Recently Booked
        </h1>
        <RecentlyBooked appointments={recentlyBookedAppointments} />
      </div>
    </div>
  );
};

export default AdminHomePage;
