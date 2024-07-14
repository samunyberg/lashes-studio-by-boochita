'use client';

import { formatDate } from '@/app/lib/dates';
import useLocale from '@/hooks/useLocale';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: { month: string; count: number }[];
}

const AppointmentLineChart = ({ data }: Props) => {
  const locale = useLocale();

  return (
    <div className='h-full'>
      <h1 className='sticky top-0 mb-5 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
        Booked {formatDate(new Date(), locale, { year: 'numeric' })}
      </h1>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid stroke='rgba(0, 0, 0, 0.1)' />
          <XAxis dataKey='month' stroke='#524237' />
          <YAxis stroke='#524237' />
          <Tooltip />
          <Line
            strokeWidth={2}
            type='monotone'
            dataKey='count'
            stroke='#c9a489'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AppointmentLineChart;
