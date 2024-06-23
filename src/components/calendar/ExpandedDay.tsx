import { Appointment } from '@prisma/client';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MotionContainer } from '../common/MotionContainer';
import ExpandedDayAppointment from './ExpandedDayAppointment';

interface Props {
  appointments: Appointment[];
  selectedDate: Date;
  showExpandedDay: boolean;
  onShowExpandedDay: () => void;
}

const ExpandedDay = ({
  selectedDate,
  showExpandedDay,
  onShowExpandedDay,
  appointments,
}: Props) => {
  if (!showExpandedDay) return null;

  const header = () => (
    <div className='flex items-center justify-between p-4'>
      <h1 className='text-md flex items-center gap-2 rounded-sm bg-accent p-2 text-white shadow'>
        <FaRegCalendarCheck className='size-5' />
        {selectedDate.toLocaleDateString('fi-FI', {
          weekday: 'long',
        }) +
          ' ' +
          selectedDate.toLocaleDateString('fi-FI')}
      </h1>
      <span className='text-lg font-medium' onClick={() => onShowExpandedDay()}>
        <IoIosCloseCircleOutline className='size-7' />
      </span>
    </div>
  );

  const subHeader = () => (
    <h2 className='mb-5'>
      {appointments.length > 0
        ? 'Click an appointment to select it. Appointment must be booked at least one hour before start time.'
        : 'No appointments for this day.'}
    </h2>
  );

  return (
    <div className='absolute inset-0 flex items-center justify-center'>
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
                onShowExpandedDay={onShowExpandedDay}
              />
            ))}
          </div>
        </div>
      </MotionContainer>
    </div>
  );
};

export default ExpandedDay;
