import { formatDate } from '@/app/lib/dates';
import useLanguage from '@/hooks/useLanguage';
import { ReactNode } from 'react';
import { FaRegCalendarCheck } from 'react-icons/fa';
import Modal from '../common/Modal';

interface Props {
  selectedDate: Date;
  showExpandedDay: boolean;
  onShowExpandedDay: () => void;
  children: ReactNode;
}

const ExpandedDay = ({
  selectedDate,
  showExpandedDay,
  onShowExpandedDay,
  children,
}: Props) => {
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  const header = (
    <span className='flex items-center gap-2 text-lg font-medium'>
      <FaRegCalendarCheck className='size-5' />
      {formatDate(selectedDate, locale, {
        weekday: 'long',
        month: 'numeric',
        day: '2-digit',
      })}
    </span>
  );

  return (
    <Modal
      isVisible={showExpandedDay}
      onClose={onShowExpandedDay}
      header={header}
      content={children}
    />
  );
};

export default ExpandedDay;
