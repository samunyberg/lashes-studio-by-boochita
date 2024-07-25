'use client';

import { User } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Input from '../common/forms/Input';
import Table, { Config } from './Table';

interface Props {
  clients: User[];
}

const config: Config<User>[] = [
  {
    label: 'Name',
    render: (user) => (
      <Link
        href={'/admin/clients/' + user.id}
        className='underline active:text-accent lg:hover:text-accent'
      >
        {`${user.firstName} ${user.lastName}`}
      </Link>
    ),
  },
  {
    label: 'Email',
    render: (user) => user.email,
  },
  {
    label: 'Phone',
    render: (user) => user.phone,
  },
];

const keyFn = (user: User) => user.id;

const ClientList = ({ clients }: Props) => {
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
        <Table data={filteredClients} config={config} keyFn={keyFn} />
      )}
    </div>
  );
};

export default ClientList;
