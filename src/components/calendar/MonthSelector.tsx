import { Dispatch, SetStateAction } from 'react';
import MonthSelectorMonth from './MonthSelectorMonth';
import useLanguage from '@/hooks/useLanguage';

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
    <div className='mb-1 flex items-center justify-between gap-2 px-4'>
      <h2 className='text-md font-semibold uppercase'>
        {new Date(currentYear, selectedMonth).toLocaleDateString(locale, {
          month: 'long',
        })}
      </h2>
      <div className='flex justify-between'>
        {[0, 1, 2].map((i) => (
          <MonthSelectorMonth
            key={i}
            monthName={new Date(
              currentYear,
              currentMonth + i
            ).toLocaleDateString(locale, {
              month: 'long',
            })}
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
