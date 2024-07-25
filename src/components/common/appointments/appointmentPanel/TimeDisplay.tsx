import { formatDSTAdjustedTime } from '@/lib/dates';
import useLocale from '@/hooks/useLocale';
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
