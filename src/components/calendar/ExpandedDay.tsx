import useLanguage from '@/hooks/useLanguage';
import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { CgCloseR } from 'react-icons/cg';
import { FaRegCalendarCheck } from 'react-icons/fa';
import Portal from '../common/Portal';

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
    <div className='mb-2 flex items-center justify-between px-5 py-4'>
      <h1 className='flex items-center gap-2 rounded-sm text-lg font-medium'>
        <FaRegCalendarCheck className='size-5' />
        {selectedDate.toLocaleDateString(locale, {
          weekday: 'long',
        }) +
          ' ' +
          selectedDate.toLocaleDateString(locale)}
      </h1>
      <span onClick={() => onShowExpandedDay()}>
        <CgCloseR size={25} />
      </span>
    </div>
  );

  return (
    <Portal>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 max-h-[0%] overflow-hidden overflow-y-visible border-t transition-all duration-200 ease-out',
          {
            'max-h-[80%]': showExpandedDay,
          }
        )}
      >
        <div className='z-50 h-full w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-white pb-20'>
          {header}
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default ExpandedDay;
