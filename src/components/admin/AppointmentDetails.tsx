'use client';

import { formatDate, formatDSTAdjustedTime } from '@/lib/dates';
import { AppointmentWithData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../common/Button';
import GoBackLink from '../common/GoBackLink';
import Modal from '../common/Modal';
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

  const noteForm = () => {
    return (
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
  };

  const renderHeader = () => (
    <div className='flex items-center gap-2 text-xl font-semibold'>
      <span>
        {formatDate(appointment.dateTime, 'en-FI', { dateStyle: 'full' })}
      </span>
      <span>{formatDSTAdjustedTime(appointment.dateTime, 'en-FI')}</span>
      <FaEdit
        size={22}
        className='ml-auto mr-2 cursor-pointer'
        onClick={() => setShowAddNote(true)}
      />
    </div>
  );

  const renderAppointment = () => {
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

  const renderNote = () => (
    <div className='flex flex-col gap-1 p-2 font-medium'>
      <span className='font-semibold'>Note:</span>
      <p>{appointment.adminNote}</p>
    </div>
  );

  return (
    <div className='mx-auto flex max-w-[750px] flex-col gap-6 pt-2'>
      <GoBackLink />
      {renderHeader()}
      {renderAppointment()}
      {appointment.adminNote && renderNote()}
      {!isPassedAppointment() && renderActionButtons()}
      {noteForm()}
    </div>
  );
};

export default AppointmentDetails;
