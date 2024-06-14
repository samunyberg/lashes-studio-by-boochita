import BookingForm from '@/components/booking/BookingForm';
import { Service, ServiceOption } from '@prisma/client';
import prisma from '../../prisma/client';

export type ServiceWithServiceOptions = Service & {
  serviceOptions: ServiceOption[];
};

const BookingPage = async () => {
  const appointments = await prisma.appointment.findMany();
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
