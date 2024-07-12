import { formatDate, formatTime } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import useLanguage from '@/hooks/useLanguage';
import { Appointment } from '@prisma/client';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import Panel from '../Panel';
import AppointmentStatusBadge from './AppointmentStatusBadge';

interface Props {
  appointment: Appointment | AppointmentWithAllData;
  showDate?: boolean;
  showTime?: boolean;
  showClient?: boolean;
  showService?: boolean;
  showServiceOption?: boolean;
  showPrice?: boolean;
}

const AppointmentPanel = ({
  appointment,
  showDate = true,
  showTime = true,
  showClient = true,
  showService = true,
  showServiceOption = true,
  showPrice = false,
}: Props) => {
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  return (
    <Panel
      border
      className='flex cursor-pointer flex-col gap-1 px-4 py-3 transition-all hover:bg-gray-100'
    >
      {appointment.status === 'BOOKED' ? (
        <>
          <div className='mb-2 flex gap-6 border-b border-accent p-2 text-base'>
            {showDate && (
              <span className='flex items-center gap-2'>
                <FaRegCalendarCheck size={15} />
                {formatDate(appointment.dateTime, locale)}
              </span>
            )}
            {showTime && (
              <span className='flex items-center gap-2'>
                <FaRegClock size={15} />
                {formatTime(appointment.dateTime, locale)}
              </span>
            )}
          </div>
          <div className='flex flex-col lg:flex-row lg:gap-6'>
            {showClient && (
              <span className='flex items-center gap-2 text-sm'>
                <IoPerson size={12} />
                {`${(appointment as AppointmentWithAllData).client?.firstName} ${(appointment as AppointmentWithAllData).client?.lastName}`}
              </span>
            )}
            {showService && (
              <span className='flex items-center gap-2 text-sm'>
                <FaCheck size={12} />
                {(appointment as AppointmentWithAllData).service?.name},{' '}
                {(appointment as AppointmentWithAllData).serviceOption?.name}
              </span>
            )}
            {showPrice && (
              <div className='flex flex-col items-end'>
                <div className='text-sm'>
                  <span>Yht: </span>
                  <span className='font-semibold'>
                    {(appointment as AppointmentWithAllData).servicePrice}€
                  </span>
                </div>
                <span className='text-xs'>
                  *Ei huomioitu mahdollista alennusta.
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='flex items-center justify-between'>
          <span className='flex items-center gap-2 text-base'>
            <FaRegClock size={15} />
            {formatTime(appointment.dateTime, locale)}
          </span>
          <AppointmentStatusBadge status={appointment.status} />
        </div>
      )}
    </Panel>
  );
};

export default AppointmentPanel;
