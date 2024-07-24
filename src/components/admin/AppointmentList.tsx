'use client';

import { formatDate, formatDSTAdjustedTime } from '@/app/lib/dates';
import { AppointmentWithData } from '@/app/lib/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import AppointmentStatusBadge from '../common/appointments/AppointmentStatusBadge';
import Input from '../common/forms/Input';
import SearchInput from '../common/forms/SearchInput';
import Table, { Config } from './Table';

interface Props {
  appointments: AppointmentWithData[];
}

const config: Config<AppointmentWithData>[] = [
  {
    label: 'Date',
    render: (app) => formatDate(app.dateTime, 'en-FI'),
  },
  {
    label: 'Time',
    render: (app) => (
      <Link href={`/admin/appointments/${app.id}`}>
        {formatDSTAdjustedTime(app.dateTime, 'en-FI')}
      </Link>
    ),
  },
  {
    label: 'Status',
    render: (app) => <AppointmentStatusBadge status={app.status} />,
  },
  {
    label: 'Client',
    render: (app) =>
      `${app.client?.firstName || ''} ${app.client?.lastName || ''}`,
  },
  {
    label: 'Service',
    render: (app) =>
      `${app.service?.name || ''} ${app.serviceOption?.name || ''}`,
  },
];

const keyFn = (app: AppointmentWithData) => app.id;

const AppointmentList = ({ appointments }: Props) => {
  const [search, setSearch] = useState({ term: '', date: '' });

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      const clientName =
        `${app.client?.firstName || ''} ${app.client?.lastName || ''}`.toLowerCase();

      const appDate = new Date(app.dateTime).toLocaleDateString('en-CA'); // 'en-CA' ensures YYYY-MM-DD format

      if (search.date) {
        return (
          clientName.includes(search.term.toLowerCase()) &&
          appDate === search.date
        );
      } else {
        return clientName.includes(search.term.toLowerCase());
      }
    });
  }, [appointments, search]);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-2 self-end lg:w-1/2'>
        <Input
          className='!w-[40%] !bg-bgSofter md:!w-[35%]'
          type='date'
          value={search.date}
          onChange={(event) =>
            setSearch({ ...search, date: event.target.value })
          }
        />
        <SearchInput
          className='!bg-bgSofter'
          placeholder='Search by client'
          value={search.term}
          onChange={(event) =>
            setSearch({ ...search, term: event.target.value })
          }
        />
      </div>
      {filteredAppointments.length === 0 ? (
        <div className='p-5 font-medium'>No results with this search.</div>
      ) : (
        <Table data={filteredAppointments} config={config} keyFn={keyFn} />
      )}
    </div>
  );
};

export default AppointmentList;
