'use client';

import MyAppointments from '@/components/account/MyAppointments';
import Button from '@/components/common/Button';
import Panel from '@/components/common/Panel';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useRouter } from 'next/navigation';
import DeleteButton from '../DeleteButton';
import DetailsPage from '../DetailsPage';

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
        <DeleteButton
          endpoint={`/api/users/${client.id}`}
          callbackUrl='/admin/clients'
        />
      )}
    </div>
  );

  return (
    <DetailsPage heading='Client Details'>
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
    </DetailsPage>
  );
};

export default ClientDetails;
