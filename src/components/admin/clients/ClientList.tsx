'use client';

import SearchInput from '@/components/common/forms/SearchInput';
import { Client } from '@/lib/types';
import Link from 'next/link';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';

interface Props {
  clients: Client[];
  itemsCount: number;
}

const config: Config<Client> = {
  columns: [
    {
      label: 'Name',
      render: (client) => (
        <Link
          href={'/admin/clients/' + client.id}
          className='underline active:text-accent lg:hover:text-accent'
        >
          {`${client.firstName} ${client.lastName}`}
        </Link>
      ),
    },
    {
      label: 'Email',
      render: (client) => client.email,
    },
    {
      label: 'Phone',
      render: (client) => client.phone,
    },
  ],
};

const keyFn = (client: Client) => client.id;

const ClientList = ({ clients, itemsCount }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex md:w-[50%] md:self-end md:p-2 lg:w-[35%]'>
        <SearchInput id='client-search' placeholder='Search clients' />
      </div>
      <PaginatedTable
        data={clients}
        config={config}
        keyFn={keyFn}
        itemsCount={itemsCount}
      />
    </div>
  );
};

export default ClientList;
