import { Appointment } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MotionContainer } from '../common/MotionContainer';
import ExpandedDayAppointment from './ExpandedDayAppointment';

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

  const header = () => (
    <div className='flex items-center justify-between p-4'>
      <h1 className='text-md rounded-sm bg-accent p-2 text-white shadow'>
        {selectedDate.toLocaleDateString('fi-FI', {
          weekday: 'long',
        }) +
          ' ' +
          selectedDate.toLocaleDateString('fi-FI')}
      </h1>
      <span
        className='text-lg font-medium'
        onClick={() => setShowExpandedDay(false)}
      >
        <IoIosCloseCircleOutline className='size-6' />
      </span>
    </div>
  );

  const subHeader = () => (
    <h2 className='mb-5'>
      {appointments.length > 0
        ? 'Click an appointment to select it.'
        : 'No appointments for this day.'}
    </h2>
  );

  return (
    <div
      className='absolute inset-0 flex items-center justify-center'
      onClick={() => setShowExpandedDay(false)}
    >
      <MotionContainer
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1, ease: 'easeIn' }}
        className='z-50 h-full w-full overflow-hidden bg-white shadow md:w-[300px]'
      >
        {header()}
        <div className='px-4 py-3'>
          {subHeader()}
          <div className='flex w-full flex-col gap-4 '>
            {appointments.map((app: Appointment) => (
              <ExpandedDayAppointment
                key={app.id}
                appointment={app}
                onSelectAppointmentId={onSelectAppointmentId}
              />
            ))}
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default ExpandedDay;
