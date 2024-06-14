import BookingDataContext from '@/contexts/bookingDataContext';
import { useContext } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import FormError from '../common/FormError';

const Step4 = () => {
  const { bookingData, bookingError } = useContext(BookingDataContext);

  return (
    <>
      <div className='border-l-4 border-accent bg-bgSoft px-2 py-4 shadow'>
        <p className='border-b border-accent border-opacity-30 px-2 pb-2 tracking-wide'>
          Please check that the information is correct. You will receive a
          confirmation email to{' '}
          <span className='font-semibold'>{bookingData.formData.email}</span>{' '}
          after booking.
        </p>
        <div className='mt-3 flex flex-col gap-1 px-4'>
          <span className='flex items-center gap-2'>
            <FaRegCalendarCheck className='size-4' />
            {bookingData.appointment?.date.toLocaleDateString('fi-FI', {
              weekday: 'long',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <span className='flex items-center gap-2'>
            <FaRegClock className='size-4' />
            {bookingData.appointment?.time.toLocaleTimeString('fi-FI', {
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

export default Step4;
