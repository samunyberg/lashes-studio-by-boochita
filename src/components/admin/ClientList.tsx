'use client';

import { Client } from '@/lib/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Input from '../common/forms/Input';
import PaginatedTable from './PaginatedTable';
import { Config } from './Table';

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
  const [search, setSearch] = useState({ term: '' });

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const clientName =
        `${client.firstName || ''} ${client.lastName || ''}`.toLowerCase();

      return clientName.includes(search.term.toLowerCase());
    });
  }, [clients, search]);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex md:w-[50%] md:self-end md:p-2 lg:w-[35%]'>
        <Input
          id='term'
          placeholder='Search clients'
          value={search.term}
          onChange={(event) =>
            setSearch({ ...search, term: event.target.value })
          }
          icon={<FaSearch />}
        />
      </div>
      {filteredClients.length === 0 ? (
        <div className='p-5 font-medium'>No results with this search.</div>
      ) : (
        <PaginatedTable
          data={filteredClients}
          config={config}
          keyFn={keyFn}
          itemsCount={itemsCount}
        />
      )}
    </div>
  );
};

export default ClientList;
