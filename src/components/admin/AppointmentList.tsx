'use client';

import { formatDate, formatDSTAdjustedTime } from '@/lib/dates';
import { AppointmentWithData } from '@/lib/types';
import Link from 'next/link';
import AppointmentStatusBadge from '../common/appointments/AppointmentStatusBadge';
import SearchDate from '../common/forms/SearchDate';
import SearchInput from '../common/forms/SearchInput';
import PaginatedTable from './PaginatedTable';
import { Config } from './Table';

interface Props {
  appointments: AppointmentWithData[];
  itemsCount: number;
}

const config: Config<AppointmentWithData> = {
  columns: [
    {
      label: 'Date',
      render: (app) => formatDate(app.dateTime, 'en-FI'),
    },
    {
      label: 'Time',
      render: (app) => (
        <Link
          href={`/admin/appointments/${app.id}`}
          className='underline transition-all active:text-accent lg:hover:text-accent'
        >
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
      render: (app) => (
        <Link
          href={`/admin/clients/${app.client?.id}`}
          className='underline transition-all active:text-accent lg:hover:text-accent'
        >
          {`${app.client?.firstName || ''} ${app.client?.lastName || ''}`}
        </Link>
      ),
    },
    {
      label: 'Service',
      render: (app) => (
        <Link
          href={`/admin/services/${app.serviceId}`}
          className='underline transition-all active:text-accent lg:hover:text-accent'
        >
          {`${app.service?.name || ''} ${app.serviceOption?.name || ''}`}
        </Link>
      ),
    },
  ],
};

const keyFn = (app: AppointmentWithData) => app.id;

const AppointmentList = ({ appointments, itemsCount }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex gap-1 md:p-2 lg:w-[45%] lg:self-end'>
        <SearchDate id='date-input' type='date' />
        <SearchInput
          className='flex-1'
          id='term'
          placeholder='Search by client name'
        />
      </div>
      {appointments.length === 0 ? (
        <div className='p-5 font-medium'>No results with this search.</div>
      ) : (
        <PaginatedTable
          data={appointments}
          itemsCount={itemsCount}
          config={config}
          keyFn={keyFn}
        />
      )}
    </div>
  );
};

export default AppointmentList;
