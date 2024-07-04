import BookingDataContext from '@/contexts/bookingDataContext';
import useLanguage from '@/hooks/useLanguage';
import { useContext } from 'react';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';

const BookingTime = () => {
  const {
    bookingData: { appointment },
  } = useContext(BookingDataContext);
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  if (!appointment) return null;

  return (
    <div className='flex items-center justify-between border-b border-accent border-opacity-30 px-3 py-3'>
      <span className='flex items-center gap-2'>
        <FaRegCalendarCheck className='size-5' />{' '}
        {appointment?.dateTime.toLocaleDateString(locale)}
      </span>
      <span className='flex items-center gap-2'>
        <FaRegClock className='size-5' />
        {appointment?.dateTime.toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
};

export default BookingTime;
