import { authOptions } from '@/app/lib/auth';
import AppointmentHistory from '@/components/account/AppointmentHistory';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';

const AppointmentHistoryPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const passedAppointments = await prisma.appointment.findMany({
    where: {
      userId: session.user.id,
      dateTime: { lt: new Date() },
    },
    include: { service: true, serviceOption: true },
    orderBy: { dateTime: 'desc' },
  });

  return (
    <>
      <StrikeThroughText className='my-6 w-full'>
        Varaushistoria
      </StrikeThroughText>
      <AppointmentHistory appointments={passedAppointments} />
    </>
  );
};

export default AppointmentHistoryPage;
