'use client';

import { AppointmentWithData } from '@/app/lib/types';
import { useRouter } from 'next/navigation';
import Calendar from '../../calendar/Calendar';
import RecentlyBooked from '../recentlyBooked/RecentlyBooked';
import AppointmentChart from './AppointmentChart';
import Today from './Today';

interface Props {
  upcomingAppointments: AppointmentWithData[];
  todaysAppointments: AppointmentWithData[];
  recentlyBooked: AppointmentWithData[];
  chartData: {
    month: string;
    count: number;
  }[];
}

const Dashboard = ({
  upcomingAppointments,
  todaysAppointments,
  recentlyBooked,
  chartData,
}: Props) => {
  const router = useRouter();

  return (
    <div className='flex h-full flex-col pb-8 lg:h-[calc(100vh-110px)]'>
      <div className='flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:grid-rows-8 lg:gap-8 lg:overflow-hidden'>
        <div className='order-2 border-b border-primary pb-8 lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-1 lg:border-none lg:pb-0'>
          <Calendar
            admin
            initialData={upcomingAppointments}
            onAppointmentSelect={(app) =>
              router.push(`/admin/appointments/${app.id}`)
            }
          />
        </div>
        <div className='order-4 h-[300px] md:h-full lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-6'>
          <div className='h-full pb-12 pr-2 lg:pr-6'>
            <AppointmentChart data={chartData} />
          </div>
        </div>
        <div className='order-1 border-b border-primary pb-8 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-1 lg:border-none lg:pb-0'>
          <Today appointments={todaysAppointments} />
        </div>
        <div className='order-3 border-b border-primary pb-8 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-5 lg:border-none lg:pb-0'>
          <RecentlyBooked initialData={recentlyBooked} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
