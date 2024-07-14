import { getMonthlyAppointmentsCount } from '@/app/lib/db/appointments';
import AppointmentChart from '@/components/admin/AppointmentChart';
import Navigation from '@/components/admin/Navigation';
import RecentlyBooked from '@/components/admin/RecentlyBooked';
import Today from '@/components/admin/Today';
import Calendar from '@/components/calendar/Calendar';

const AdminHomePage = async () => {
  const lineChartData = await getMonthlyAppointmentsCount(
    new Date().getFullYear(),
    'en-FI'
  );

  return (
    <div className='flex h-full flex-col pb-5 lg:h-[calc(100vh-60px)]'>
      <Navigation />
      <div className='mt-3 flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:grid-rows-8 lg:gap-8 lg:overflow-hidden'>
        <div className='order-2 lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-1'>
          <Calendar admin />
        </div>
        <div className='order-4 h-[300px] md:h-full lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-6'>
          <div className='h-full pb-12 pr-2 lg:pr-6'>
            <AppointmentChart data={lineChartData} />
          </div>
        </div>
        <div className='order-1 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-1'>
          <Today />
        </div>
        <div className='order-3 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-5'>
          <RecentlyBooked />
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default AdminHomePage;
