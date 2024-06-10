import { FaCheckCircle } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';

interface Props {
  dayHasAvailableAppointments: boolean;
  isPassedDay: boolean;
}

const AvailabilityIndicator = ({
  dayHasAvailableAppointments,
  isPassedDay,
}: Props) => {
  return (
    <>
      {dayHasAvailableAppointments && !isPassedDay && (
        <FaCheckCircle className='size-3 text-green-400' />
      )}

      {!dayHasAvailableAppointments && !isPassedDay && (
        <FaBan className='size-3 text-red-400' />
      )}
    </>
  );
};

export default AvailabilityIndicator;
