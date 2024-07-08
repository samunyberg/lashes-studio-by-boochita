import { Dispatch, SetStateAction } from 'react';

interface Props {
  monthName: string;
  currentMonth: number;
  selectedMonth: number;
  onSelect: Dispatch<SetStateAction<number>>;
}

const MonthSelectorMonth = ({
  monthName: month,
  currentMonth,
  selectedMonth,
  onSelect,
}: Props) => {
  const isSelected = currentMonth === selectedMonth;

  return (
    <span
      className={`${isSelected ? 'border-l-2 border-accent bg-bgSoft px-2 font-semibold' : ''} mx-2 cursor-pointer text-sm font-medium transition-all`}
      onClick={() => onSelect(currentMonth)}
    >
      {month}
    </span>
  );
};

export default MonthSelectorMonth;
