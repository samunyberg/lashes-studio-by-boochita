import useLocale from '@/hooks/useLocale';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import { FaRegCalendarCheck } from 'react-icons/fa';

interface Props {
  date: Date;
}

const DateDisplay = ({ date }: Props) => {
  const locale = useLocale();
  return (
    <span className='flex items-center gap-2'>
      <FaRegCalendarCheck size={15} />
      {formatDate(date, locale)}
    </span>
  );
};

export default DateDisplay;
