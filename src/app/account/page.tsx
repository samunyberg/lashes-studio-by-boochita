import MyAppointments from '@/components/account/MyAppointments';
import MyInformation from '@/components/account/MyInformation';
import Label from '@/components/common/Label';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';

const Account = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({
    where: { id: session!.user.id },
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

  if (!user) return null;

  return (
    <>
      <StrikeThroughText className='my-6 w-full'>
        <Label labelId='my_account' />
      </StrikeThroughText>
      <div className='flex flex-col pb-16 lg:w-full lg:flex-row lg:gap-20'>
        <div className='lg:flex-1'>
          <MyInformation user={user} />
        </div>
        <div className='mt-8 lg:my-0 lg:flex-1'>
          <MyAppointments appointments={user.appointments} />
        </div>
      </div>
    </>
  );
};

export default Account;
