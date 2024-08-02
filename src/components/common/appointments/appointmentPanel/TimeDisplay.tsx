import useLocale from '@/hooks/useLocale';
import { formatDSTAdjustedTime } from '@/lib/utils/dateAndTimeUtils';
import { FaRegClock } from 'react-icons/fa';

interface Props {
  dateTime: Date;
}

const TimeDisplay = ({ dateTime }: Props) => {
  const locale = useLocale();
  return (
    <span className='flex items-center gap-2'>
      <FaRegClock size={15} />
      {formatDSTAdjustedTime(dateTime, locale)}
    </span>
  );
};

export default TimeDisplay;
