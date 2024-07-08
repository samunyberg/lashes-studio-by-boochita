import BookingForm from '@/components/booking/BookingForm';
import prisma from '../../prisma/client';

const BookingPage = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const appointments = await prisma.appointment.findMany({
    where: {
      dateTime: {
        gte: todayStart,
      },
    },
    include: { service: true, serviceOption: true, client: true },
  });

  const services = await prisma.service.findMany({
    include: { serviceOptions: true },
  });

  return (
    <div className='min-h-[calc(100vh-55px)]'>
      <BookingForm appointments={appointments} services={services} />
    </div>
  );
};

export default BookingPage;
