import MyAppointments from '@/components/account/MyAppointments';
import MyInformation from '@/components/account/MyInformation';
import Label from '@/components/common/Label';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { getClientWithUpcomingAppointments } from '@/lib/db/clients';
import { AppointmentWithData } from '@/lib/types';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AccountPage = async ({ params: { id } }: Props) => {
  const client = await getClientWithUpcomingAppointments(id);

  if (!client) notFound();

  return (
    <>
      <StrikeThroughText className='my-6 w-full'>
        <Label labelId='my_account' />
      </StrikeThroughText>
      <div className='flex flex-col pb-16 lg:w-full lg:flex-row lg:gap-20'>
        <div className='lg:flex-1'>
          <MyInformation user={client} />
        </div>
        <div className='mt-8 lg:my-0 lg:flex-1'>
          <MyAppointments
            appointments={client.appointments as AppointmentWithData[]}
            clientId={id}
          />
        </div>
      </div>
    </>
  );
};

export default AccountPage;