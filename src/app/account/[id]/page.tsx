import MyAppointments from '@/components/account/MyAppointments';
import MyInformation from '@/components/account/MyInformation';
import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { getClientWithUpcomingAppointments } from '@/lib/db/clients';
import { AppointmentWithData } from '@/lib/types';
import Link from 'next/link';
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
      <div className='flex flex-col pb-16'>
        <MyInformation user={client} />
        <MyAppointments
          appointments={client.appointments as AppointmentWithData[]}
        />
        <Link href={`/account/${client.id}/appointment-history`}>
          <Button variant='primary' className='w-full lg:float-end lg:w-fit'>
            <Label labelId='show_appointment_history' />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AccountPage;
