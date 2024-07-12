import { formatDate, formatTime } from '@/app/lib/dates';
import BookingDataContext from '@/contexts/bookingDataContext';
import useLanguage from '@/hooks/useLanguage';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import FormError from '../common/forms/FormError';
import Label from '../common/Label';
import Panel from '../common/Panel';

const Step3 = () => {
  const { data: session } = useSession();
  const { currentLanguage } = useLanguage();
  const { bookingData, bookingError } = useContext(BookingDataContext);
  const locale = `${currentLanguage}-FI`;

  return (
    <>
      <Panel className='px-4 py-4'>
        <Label labelId='please_check_information' />
        <span className='font-semibold'> {session?.user.email}.</span>
        <div className='mt-3 flex flex-col gap-1 px-4'>
          <span className='flex items-center gap-2'>
            <FaRegCalendarCheck className='size-4' />
            {formatDate(new Date(bookingData.appointment?.dateTime), locale, {
              weekday: 'long',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <span className='flex items-center gap-2'>
            <FaRegClock className='size-4' />
            {formatTime(new Date(bookingData.appointment?.dateTime), locale)}
          </span>
          <span className='flex items-center gap-2'>
            <FaCheck className='size-3' />
            {bookingData.service?.name}
          </span>
          <span className='flex items-center gap-2'>
            <FaCheck className='size-3' />
            {bookingData.serviceOption?.name}
          </span>
        </div>
      </Panel>
      <FormError className='my-5 !text-left text-sm'>{bookingError}</FormError>
    </>
  );
};

export default Step3;
