import { Appointment } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import AppointmentStatusBadge from '../common/AppointmentStatusBadge';
import { MotionContainer } from '../common/MotionContainer';

interface Props {
  selectedDate: Date;
  showExpandedDay: boolean;
  setShowExpandedDay: Dispatch<SetStateAction<boolean>>;
  onSelectAppointmentId: Dispatch<SetStateAction<number | null>>;
  appointments: Appointment[];
}

const ExpandedDay = ({
  selectedDate,
  showExpandedDay,
  setShowExpandedDay,
  onSelectAppointmentId,
  appointments,
}: Props) => {
  if (!showExpandedDay) return null;

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-white/20'>
      <MotionContainer
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        className='z-50 w-[80%] overflow-hidden rounded-sm bg-white shadow-md md:w-[300px]'
      >
        <div className='flex items-center justify-between bg-red-300 p-4 text-white'>
          <h1 className='text-lg font-medium uppercase'>
            {selectedDate.toLocaleDateString('fi-FI', {
              weekday: 'short',
            }) +
              ' ' +
              selectedDate.toLocaleDateString('fi-FI')}
          </h1>
          <span
            className='text-lg font-medium'
            onClick={() => setShowExpandedDay(false)}
          >
            X
          </span>
        </div>
        <div className='px-4 py-8'>
          <h2 className='mb-4'>
            {appointments.length > 0
              ? 'Click an appointment to select it.'
              : 'No appointments for this day.'}
          </h2>
          <div className='flex w-full flex-col gap-4 '>
            {appointments.map((app: Appointment) => (
              <div
                key={app.id}
                className={`${app.status !== 'AVAILABLE' ? 'pointer-events-none' : ''} flex h-14 w-full items-center justify-between border border-accent px-4 py-2`}
                onClick={() => {
                  if (app.status !== 'AVAILABLE') return;
                  onSelectAppointmentId(app.id);
                }}
              >
                <span className='text-lg'>
                  {app.time.toLocaleTimeString('fi-FI', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <AppointmentStatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default ExpandedDay;
