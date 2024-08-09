import MyAppointments from '@/components/account/MyAppointments';
import MyInformation from '@/components/account/MyInformation';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
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
    <Container className='pb-8'>
      <StrikeThroughText className='my-6 w-full'>
        <Label labelId='my_account' />
      </StrikeThroughText>
      <div className='flex flex-col gap-3'>
        <MyInformation user={client} />
        <hr className='my-5 w-full border-black/20' />
        <MyAppointments
          appointments={client.appointments as AppointmentWithData[]}
        />
        <Link href={`/account/${client.id}/appointment-history`}>
          <Button variant='primary' className='mt-2 w-full lg:w-fit'>
            <Label labelId='show_appointment_history' />
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default AccountPage;
