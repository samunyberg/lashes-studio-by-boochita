import BookingForm from '@/components/booking/BookingForm';
import { getUpcomingAppointments } from '@/lib/db/appointments';
import prisma from '@/prisma/client';

const BookingPage = async () => {
  const services = await prisma.service.findMany({
    include: { serviceOptions: true },
  });

  const appointments = await getUpcomingAppointments();

  return (
    <div className='min-h-[calc(100vh-55px)]'>
      <BookingForm services={services} appointments={appointments} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default BookingPage;
