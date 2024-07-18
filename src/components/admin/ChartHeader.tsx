'use client';

import { formatDate } from '@/app/lib/dates';
import useLocale from '@/hooks/useLocale';
import Label from '../common/Label';

const ChartHeader = () => {
  const locale = useLocale();

  return (
    <h1 className='sticky top-0 mb-3 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
      <Label labelId='booked' />{' '}
      {formatDate(new Date(), locale, { year: 'numeric' })}
    </h1>
  );
};

export default ChartHeader;
