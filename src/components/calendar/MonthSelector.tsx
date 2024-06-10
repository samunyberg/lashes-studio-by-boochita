import { Dispatch, SetStateAction } from 'react';
import MonthSelectorMonth from './MonthSelectorMonth';

interface Props {
  currentDate: Date;
  selectedMonth: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

const MonthSelector = ({ currentDate, selectedMonth, onSelect }: Props) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <div className='mb-1 flex flex-col gap-2 px-4 md:mb-4 md:flex-row md:items-center md:justify-between md:gap-0'>
      <h2 className='text-lg uppercase tracking-wide'>
        {new Date(currentYear, selectedMonth).toLocaleDateString('fi-FI', {
          month: 'long',
          year: 'numeric',
        })}
      </h2>
      <div className='flex justify-between md:justify-normal md:gap-1'>
        {[0, 1, 2].map((i) => (
          <MonthSelectorMonth
            key={i}
            monthName={new Date(
              currentYear,
              currentMonth + i
            ).toLocaleDateString('fi-FI', {
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
