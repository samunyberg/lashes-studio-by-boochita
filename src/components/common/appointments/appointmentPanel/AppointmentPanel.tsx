'use client';

import { AppointmentWithData } from '@/lib/types';
import Panel from '../../Panel';
import AppointmentStatusBadge from '../AppointmentStatusBadge';
import ClientInfo from './ClientInfo';
import DateDisplay from './DateDisplay';
import PriceInfo from './PriceInfo';
import ServiceInfo from './ServiceInfo';
import TimeDisplay from './TimeDisplay';

interface Props {
  appointment: AppointmentWithData;
  showDate?: boolean;
  showTime?: boolean;
  showClient?: boolean;
  showService?: boolean;
  showStatusBadge?: boolean;
  showPrice?: boolean;
}

const AppointmentPanel = ({
  appointment,
  showDate = true,
  showTime = true,
  showClient = false,
  showService = false,
  showStatusBadge = false,
  showPrice = false,
}: Props) => {
  return (
    <Panel
      border
      className='flex cursor-pointer flex-col gap-2 px-4 py-3 transition-all active:bg-bgSofter lg:py-2 lg:hover:bg-bgSofter'
    >
      <div className='flex gap-6'>
        {showDate && <DateDisplay date={appointment.dateTime} />}
        {showTime && <TimeDisplay dateTime={appointment.dateTime} />}
        {showStatusBadge && (
          <span className='ml-auto'>
            <AppointmentStatusBadge status={appointment.status} />
          </span>
        )}
      </div>
      <div className='flex flex-col'>
        {showClient && <ClientInfo client={appointment.client} />}
        {showService && (
          <ServiceInfo
            service={appointment.service}
            serviceOption={appointment.serviceOption}
          />
        )}
        {showPrice && <PriceInfo price={appointment.servicePrice} />}
      </div>
    </Panel>
  );
};

export default AppointmentPanel;
