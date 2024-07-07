import BookingDataContext from '@/contexts/bookingDataContext';
import useLanguage from '@/hooks/useLanguage';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import FormError from '../common/forms/FormError';
import Label from '../common/Label';

const Step3 = () => {
  const { data: session } = useSession();
  const { currentLanguage } = useLanguage();
  const { bookingData, bookingError } = useContext(BookingDataContext);
  const locale = `${currentLanguage}-FI`;

  return (
    <>
      <div className='border-l-4 border-accent bg-bgSoft px-4 py-4 font-medium shadow'>
        <Label labelId='please_check_information' />
        <span className='font-semibold'> {session?.user.email}.</span>
        <div className='mt-3 flex flex-col gap-1 px-4'>
          <span className='flex items-center gap-2'>
            <FaRegCalendarCheck className='size-4' />
            {bookingData.appointment?.dateTime.toLocaleDateString(locale, {
              weekday: 'long',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <span className='flex items-center gap-2'>
            <FaRegClock className='size-4' />
            {bookingData.appointment?.dateTime.toLocaleTimeString(locale, {
              hour: '2-digit',
              minute: '2-digit',
            })}
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
      </div>
      <FormError className='my-5 !text-left text-sm'>{bookingError}</FormError>
    </>
  );
};

export default Step3;
