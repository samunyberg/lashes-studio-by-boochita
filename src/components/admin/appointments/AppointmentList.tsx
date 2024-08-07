'use client';

import AppointmentStatusBadge from '@/components/common/appointments/AppointmentStatusBadge';
import SearchDate from '@/components/common/forms/SearchDate';
import SearchInput from '@/components/common/forms/SearchInput';
import { AppointmentWithData } from '@/lib/types';
import {
  formatDate,
  formatDSTAdjustedTime,
} from '@/lib/utils/dateAndTimeUtils';
import Link from 'next/link';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';

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
          {`${app.service?.name || ''} ${app.serviceOption?.name_en || ''}`}
        </Link>
      ),
    },
  ],
};

const keyFn = (app: AppointmentWithData) => app.id;

const AppointmentList = ({ appointments, itemsCount }: Props) => {
  const searchBar = (
    <div className='flex flex-col gap-3 md:flex-row md:p-2 lg:w-[50%] lg:self-end'>
      <SearchDate id='date-input' type='date' />
      <SearchInput id='term' placeholder='Search by client name' />
    </div>
  );

  return (
    <div className='flex flex-col gap-5'>
      {searchBar}
      <PaginatedTable
        data={appointments}
        itemsCount={itemsCount}
        config={config}
        keyFn={keyFn}
      />
    </div>
  );
};

export default AppointmentList;
