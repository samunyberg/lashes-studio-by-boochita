'use client';

import AppointmentPanel from '@/components/common/appointments/appointmentPanel/AppointmentPanel';
import Button from '@/components/common/Button';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import { AppointmentWithData } from '@/lib/types';
import {
  formatDate,
  formatDSTAdjustedTime,
} from '@/lib/utils/dateAndTimeUtils';
import { useRouter } from 'next/navigation';
import ManagementPage from '../ManagementPage';
import AdminNote from './AdminNote';
import CancelButton from './CancelButton';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentOverview = ({ appointment }: Props) => {
  const router = useRouter();

  const renderHeader = (
    <div className='flex gap-3'>
      <span>
        {formatDate(appointment.dateTime, 'en-FI', { dateStyle: 'full' })}
      </span>
      <span>|</span>
      <span>{formatDSTAdjustedTime(appointment.dateTime, 'en-FI')}</span>
    </div>
  );

  const renderBookedAt = () => {
    return appointment.rescheduledAt ? (
      <p className='font-medium'>
        <span>Rescheduled at:</span>{' '}
        {appointment.rescheduledAt?.toLocaleString('en-FI', {
          dateStyle: 'short',
          timeStyle: 'short',
        })}
      </p>
    ) : (
      <p className='font-medium'>
        <span>Booked at:</span>{' '}
        {appointment.bookedAt?.toLocaleString('en-FI', {
          dateStyle: 'short',
          timeStyle: 'short',
        })}
      </p>
    );
  };

  const renderAppointment = () => {
    switch (appointment.status) {
      case 'BOOKED':
        return (
          <AppointmentPanel
            className='cursor-default'
            appointment={appointment}
            showClient
            showService
            showDate={false}
            showTime={false}
            showPrice
          />
        );
      case 'AVAILABLE':
        return <Panel className='p-4'>This appointment is available.</Panel>;
      case 'UNAVAILABLE':
        return (
          <Panel className='p-4'>
            This appointment has been marked unavailable.
          </Panel>
        );
      default:
        return null;
    }
  };

  const renderActionButtons = () => {
    switch (appointment.status) {
      case 'BOOKED':
        return (
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <AdminNote appointment={appointment} />
            <Button
              variant='accent'
              onClick={() =>
                router.replace(
                  `/admin/appointments/${appointment.id}/reschedule`
                )
              }
            >
              Reschedule
            </Button>
            <CancelButton appointmentId={appointment.id} />
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

  const renderNote = (
    <Panel className='flex flex-col gap-1 p-4 font-medium'>
      <span className='font-semibold'>Note:</span>
      <p>{appointment.adminNote}</p>
    </Panel>
  );

  const isPassedAppointment = () => appointment.dateTime < new Date();

  return (
    <ManagementPage heading={renderHeader}>
      {renderBookedAt()}
      {renderAppointment()}
      {appointment.adminNote && renderNote}
      {!isPassedAppointment() && (
        <>
          <Spacer />
          {renderActionButtons()}
        </>
      )}
    </ManagementPage>
  );
};

export default AppointmentOverview;
