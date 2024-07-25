import { formatDate } from '@/lib/dates';
import useLanguage from '@/hooks/useLanguage';
import { Dispatch, SetStateAction } from 'react';
import MonthSelectorMonth from './MonthSelectorMonth';

interface Props {
  currentDate: Date;
  selectedMonth: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

const MonthSelector = ({ currentDate, selectedMonth, onSelect }: Props) => {
  const { currentLanguage } = useLanguage();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const locale = `${currentLanguage}-FI`;

  return (
    <div className='flex h-full items-center justify-between gap-2 px-4'>
      <h2 className='text-md font-semibold uppercase'>
        {formatDate(new Date(currentYear, selectedMonth), locale, {
          month: 'long',
        })}
      </h2>
      <div className='flex justify-between'>
        {[0, 1, 2].map((i) => (
          <MonthSelectorMonth
            key={i}
            monthName={formatDate(
              new Date(currentYear, currentMonth + i),
              locale,
              {
                month: 'long',
              }
            )}
            currentMonth={currentMonth + i}
            selectedMonth={selectedMonth}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthSelector;
