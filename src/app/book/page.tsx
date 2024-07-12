import BookingForm from '@/components/booking/BookingForm';
import prisma from '../../prisma/client';

const BookingPage = async () => {
  const services = await prisma.service.findMany({
    include: { serviceOptions: true },
  });

  return (
    <div className='min-h-[calc(100vh-55px)]'>
      <BookingForm services={services} />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default BookingPage;
