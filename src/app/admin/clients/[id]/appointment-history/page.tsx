import AppointmentHistory from '@/components/account/AppointmentHistory';
import Container from '@/components/common/Container';
import GoBackLink from '@/components/common/GoBackLink';
import { getPassedAppointmentsByClientId } from '@/lib/db/appointments';
import { getClientById } from '@/lib/db/clients';
import { formatName } from '@/lib/utils/stringUtils';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const AdminAppointmentHistoryPage = async ({ params: { id } }: Props) => {
  const client = await getClientById(id);

  if (!client) notFound();

  const passedAppointments = await getPassedAppointmentsByClientId(id);

  return (
    <Container>
      <GoBackLink />
      <h1 className='my-6 text-xl font-semibold'>
        {`${formatName(client)}'s History`}
      </h1>
      <AppointmentHistory appointments={passedAppointments} />
    </Container>
  );
};

export default AdminAppointmentHistoryPage;
