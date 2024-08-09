'use client';

import MyAppointments from '@/components/account/MyAppointments';
import Button from '@/components/common/Button';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import { AppointmentWithData, ClientWithAppointments } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { useRouter } from 'next/navigation';
import DeleteButton from '../DeleteButton';
import ManagementPage from '../ManagementPage';

interface Props {
  client: ClientWithAppointments;
}

const ClientDetails = ({ client }: Props) => {
  const router = useRouter();

  return (
    <ManagementPage heading='Manage Client'>
      <Panel className='flex flex-col gap-3 p-4'>
        <div>{`Name: ${formatName(client)}`}</div>
        <div>{`Email: ${client.email}`}</div>
        <div>{`Phone: ${client.phone}`}</div>
      </Panel>
      <Spacer className='my-3' />
      <MyAppointments
        appointments={client.appointments as AppointmentWithData[]}
      />
      <Spacer className='my-3' />
      <div className='flex flex-col gap-4 lg:flex-row'>
        <Button
          className='w-full lg:w-fit'
          onClick={() =>
            router.push(`/admin/clients/${client.id}/appointment-history`)
          }
        >
          Appointment History
        </Button>
        <DeleteButton
          endpoint={`/api/users/${client.id}`}
          callbackUrl='/admin/clients'
        />
      </div>
    </ManagementPage>
  );
};

export default ClientDetails;
