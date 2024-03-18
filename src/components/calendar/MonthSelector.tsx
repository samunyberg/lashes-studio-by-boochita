import { Dispatch, SetStateAction } from 'react';

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
        <span
          className={`${selectedMonth === currentMonth ? 'bg-accent text-white' : ''} rounded-sm  px-2 py-1 text-sm transition-all`}
          onClick={() => onSelect(currentMonth)}
        >
          {new Date(currentYear, currentMonth).toLocaleDateString('fi-FI', {
            month: 'long',
          })}
        </span>
        <span
          className={`${selectedMonth === currentMonth + 1 ? 'bg-accent text-white' : ''} rounded-sm  px-2 py-1 text-sm transition-all`}
          onClick={() => onSelect(currentMonth + 1)}
        >
          {new Date(currentYear, currentMonth + 1).toLocaleDateString('fi-FI', {
            month: 'long',
          })}
        </span>
        <span
          className={`${selectedMonth === currentMonth + 2 ? 'bg-accent text-white' : ''} rounded-sm  px-2 py-1 text-sm transition-all`}
          onClick={() => onSelect(currentMonth + 2)}
        >
          {new Date(currentYear, currentMonth + 2).toLocaleDateString('fi-FI', {
            month: 'long',
          })}
        </span>
      </div>
    </div>
  );
};

export default MonthSelector;
