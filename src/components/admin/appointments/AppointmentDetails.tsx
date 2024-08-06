'use client';

import AppointmentPanel from '@/components/common/appointments/appointmentPanel/AppointmentPanel';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Panel from '@/components/common/Panel';
import { AppointmentWithData } from '@/lib/types';
import {
  formatDate,
  formatDSTAdjustedTime,
} from '@/lib/utils/dateAndTimeUtils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import DetailsPage from '../DetailsPage';
import CancelButton from './CancelButton';
import NoteForm from './NoteForm';

interface Props {
  appointment: AppointmentWithData;
}

const AppointmentDetails = ({ appointment }: Props) => {
  const router = useRouter();
  const [showAddNote, setShowAddNote] = useState(false);

  const isPassedAppointment = () => {
    return new Date() >= new Date(appointment.dateTime);
  };

  const handleCloseNoteform = () => setShowAddNote(false);

  const admiNoteModal = (
    <Modal
      isVisible={showAddNote}
      header={
        <h1 className='text-lg font-semibold'>
          {appointment.adminNote ? 'Edit Note' : 'Add Note'}
        </h1>
      }
      content={
        <NoteForm
          appointmentId={appointment.id}
          initialNote={appointment.adminNote}
          onClose={handleCloseNoteform}
        />
      }
      onClose={() => setShowAddNote(false)}
    />
  );

  const renderHeader = (
    <div className='flex gap-3'>
      <span>
        {formatDate(appointment.dateTime, 'en-FI', { dateStyle: 'full' })}
      </span>
      <span>|</span>
      <span>{formatDSTAdjustedTime(appointment.dateTime, 'en-FI')}</span>
    </div>
  );

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
            <Button>
              <span
                className='flex items-center gap-2'
                onClick={() => setShowAddNote(true)}
              >
                <FaEdit size={22} className='cursor-pointer' />
                <p>{appointment.adminNote ? 'Edit Note' : 'Add Note'}</p>
              </span>
            </Button>
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

  return (
    <DetailsPage heading={renderHeader}>
      {renderAppointment()}
      {appointment.adminNote && renderNote}
      {!isPassedAppointment() && (
        <>
          <hr className='w-full border-black/20' />
          {renderActionButtons()}
        </>
      )}
      {admiNoteModal}
    </DetailsPage>
  );
};

export default AppointmentDetails;
