'use client';

import MyAppointments from '@/components/account/MyAppointments';
import Panel from '@/components/common/Panel';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';
import Container from '../common/Container';
import GoBackLink from '../common/GoBackLink';
import DeleteClientButton from './DeleteClientButton';

interface Props {
  client: ClientWithAppointments;
}

const ClientDetails = ({ client }: Props) => {
  const router = useRouter();

  const actionButtons = (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <Button
        className='w-full lg:w-fit'
        onClick={() =>
          router.push(`/admin/clients/${client.id}/appointment-history`)
        }
      >
        Appointment History
      </Button>
      {client.appointments.length === 0 && (
        <DeleteClientButton
          clientId={client.id}
          clientName={client.firstName}
        />
      )}
    </div>
  );

  return (
    <Container className='flex flex-col gap-6 pb-8'>
      <GoBackLink />
      <h1 className='text-xl font-semibold'>Client Details</h1>
      <Panel className='flex flex-col gap-3 p-4'>
        <div>{`Name: ${formatName(client)}`}</div>
        <div>{`Email: ${client.email}`}</div>
        <div>{`Phone: ${client.phone}`}</div>
      </Panel>
      <hr className='w-full border-black/20' />
      <MyAppointments
        appointments={client.appointments as AppointmentWithData[]}
      />
      <hr className='w-full border-black/20' />
      {actionButtons}
    </Container>
  );
};

export default ClientDetails;
