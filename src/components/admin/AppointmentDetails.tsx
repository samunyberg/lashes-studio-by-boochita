'use client';

import { formatDate, formatDSTAdjustedTime } from '@/lib/dates';
import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../common/Button';
import GoBackLink from '../common/GoBackLink';
import CancelButton from './CancelButton';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentDetails = ({ appointment }: Props) => {
  const router = useRouter();

  const isPassedAppointment = () => {
    return new Date() >= new Date(appointment.dateTime);
  };

  const renderStatusMessage = () => {
    switch (appointment.status) {
      case 'BOOKED':
        return (
          <AppointmentPanel
            appointment={appointment}
            showClient
            showService
            showDate={false}
            showTime={false}
          />
        );
      case 'AVAILABLE':
        return (
          <div className='font-medium'>This appointment is available.</div>
        );
      case 'UNAVAILABLE':
        return (
          <div className='font-medium'>
            This appointment has been marked unavailable.
          </div>
        );
      default:
        return null;
    }
  };

  const renderActionButtons = () => {
    switch (appointment.status) {
      case 'BOOKED':
        return (
          <div className='flex flex-col gap-4 md:flex-row'>
            <CancelButton appointmentId={appointment.id} />
            <Button
              onClick={() =>
                router.replace(
                  '/admin/appointments/' + appointment.id + '/reschedule'
                )
              }
            >
              Reschedule
            </Button>
          </div>
        );
      case 'AVAILABLE':
        return <Button>Make unavailable</Button>;
      case 'UNAVAILABLE':
        return <Button>Make available</Button>;
      default:
        return null;
    }
  };

  return (
    <div className='mx-auto flex max-w-[750px] flex-col gap-6 pt-2'>
      <GoBackLink />
      <div className='flex justify-center gap-2 text-lg font-semibold'>
        <span>
          {formatDate(appointment.dateTime, 'en-FI', { dateStyle: 'full' })}
        </span>
        <span>{formatDSTAdjustedTime(appointment.dateTime, 'en-FI')}</span>
      </div>
      {renderStatusMessage()}
      {!isPassedAppointment() && renderActionButtons()}
    </div>
  );
};

export default AppointmentDetails;
