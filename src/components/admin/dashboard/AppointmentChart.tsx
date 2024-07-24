import { formatDate } from '@/app/lib/dates';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
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
import DashboardHeader from './DashboardHeader';

interface Props {
  data: { month: string; count: number }[];
}

const AppointmentLineChart = ({ data }: Props) => {
  const locale = useLocale();

  return (
    <div className='h-full'>
      <DashboardHeader>
        <Label labelId='booked' />{' '}
        {formatDate(new Date(), locale, { year: 'numeric' })}
      </DashboardHeader>
      <Panel className='h-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='rgba(0, 0, 0, 0.2)' />
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
      </Panel>
    </div>
  );
};

export default AppointmentLineChart;
