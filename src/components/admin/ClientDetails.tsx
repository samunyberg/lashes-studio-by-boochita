'use client';

import MyAppointments from '@/components/account/MyAppointments';
import Panel from '@/components/common/Panel';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils';
import Button from '../common/Button';
import GoBackLink from '../common/GoBackLink';
import DeleteClientButton from './DeleteClientButton';
import { useRouter } from 'next/navigation';

interface Props {
  client: ClientWithAppointments;
}

const ClientDetails = ({ client }: Props) => {
  const router = useRouter();

  return (
    <div className='mx-auto flex min-h-[calc(100vh-110px)] max-w-[750px] flex-col justify-between pb-5'>
      <div>
        <GoBackLink />
        <h1 className='my-5 text-xl font-semibold'>Client Details</h1>
        <Panel className='flex  flex-col gap-3 p-4'>
          <div>{`Name: ${formatName(client)}`}</div>
          <div>{`Email: ${client.email}`}</div>
          <div>{`Phone: ${client.phone}`}</div>
        </Panel>
        <hr className='my-5 w-full border border-black/20' />
        <MyAppointments
          appointments={client.appointments as AppointmentWithData[]}
          clientId={client.id}
        />
        <Button
          className='w-full'
          onClick={() =>
            router.push(`/admin/clients/${client.id}/appointment-history`)
          }
        >
          Appointment History
        </Button>
      </div>
      {client.appointments.length === 0 && (
        <DeleteClientButton
          clientId={client.id}
          clientName={client.firstName}
        />
      )}
    </div>
  );
};

export default ClientDetails;
