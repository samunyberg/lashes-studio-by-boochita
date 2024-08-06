import BookingDataContext from '@/contexts/bookingDataContext';
import useLocale from '@/hooks/useLocale';
import {
  formatDate,
  formatDSTAdjustedTime,
} from '@/lib/utils/dateAndTimeUtils';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { FaCheck, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import FormError from '../common/forms/FormError';
import Label from '../common/Label';
import Modal from '../common/Modal';
import Panel from '../common/Panel';

const Step3 = () => {
  const { data: session } = useSession();
  const { bookingData, bookingError, termsAccepted, setTermsAccepted } =
    useContext(BookingDataContext);
  const locale = useLocale();
  const [showTerms, setShowTerms] = useState(false);

  const termsModal = (
    <Modal
      header={<h1 className='text-lg font-semibold'>Terms of Service</h1>}
      content={
        <div className='flex flex-col gap-8 px-2 font-medium'>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            cumque expedita aliquam repudiandae quod tempora ad quos vitae
            beatae cum blanditiis iste, minima dolorem, a consequuntur libero
            adipisci? Dignissimos unde fugiat enim doloremque dolor, ea nulla
            vero repellendus odio veritatis quasi iure iusto, nihil quibusdam
            debitis quod. Praesentium, non dicta!
          </p>
          <Button
            variant='accent'
            onClick={() => {
              setTermsAccepted(true);
              setShowTerms(false);
            }}
          >
            OK
          </Button>
        </div>
      }
      isVisible={showTerms}
      onClose={() => setShowTerms(false)}
    />
  );

  return (
    <div className='flex flex-col gap-4'>
      <Panel className='p-4'>
        <Label labelId='please_check_information' />
        <span className='font-semibold'> {session?.user.email}.</span>
        <div className='mt-3 flex flex-col gap-1 px-4'>
          <span className='flex items-center gap-2'>
            <FaRegCalendarCheck className='size-4' />
            {formatDate(new Date(bookingData.appointment!.dateTime), locale, {
              weekday: 'long',
              month: 'long',
              day: '2-digit',
            })}
          </span>
          <span className='flex items-center gap-2'>
            <FaRegClock className='size-4' />
            {formatDSTAdjustedTime(
              new Date(bookingData.appointment!.dateTime),
              locale
            )}
          </span>
          <span className='flex items-center gap-2'>
            <FaCheck className='size-3' />
            {bookingData.service?.name}
          </span>
          <span className='flex items-center gap-2'>
            <FaCheck className='size-3' />
            {bookingData.serviceOption?.name_en}
          </span>
        </div>
      </Panel>
      <Panel
        className='flex cursor-pointer items-center gap-2 p-4'
        onClick={() => setTermsAccepted(!termsAccepted)}
      >
        <CheckBox isChecked={termsAccepted} />
        <p>
          I accept the{' '}
          <span
            className='cursor-pointer underline'
            onClick={() => setShowTerms(true)}
          >
            terms of service.
          </span>
        </p>
      </Panel>
      <FormError className='my-5 !text-left text-sm'>{bookingError}</FormError>
      {termsModal}
    </div>
  );
};

export default Step3;
