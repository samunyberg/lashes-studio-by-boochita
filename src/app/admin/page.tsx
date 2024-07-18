import {
  getMonthlyAppointmentsCount,
  getRecentlyBookedAppointments,
  getTodaysAppointments,
  getUpcomingAppointments,
} from '@/app/lib/db/appointments';
import AppointmentChart from '@/components/admin/AppointmentChart';
import RecentlyBooked from '@/components/admin/RecentlyBooked';
import Today from '@/components/admin/Today';
import Calendar from '@/components/calendar/Calendar';

const AdminHomePage = async () => {
  const upcomingAppointments = await getUpcomingAppointments();
  const todaysAppointments = await getTodaysAppointments();
  const recentlyBooked = await getRecentlyBookedAppointments();
  const chartData = await getMonthlyAppointmentsCount();

  return (
    <div className='flex h-full flex-col pb-5 lg:h-[calc(100vh-110px)]'>
      <div className='flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:grid-rows-8 lg:gap-8 lg:overflow-hidden'>
        <div className='order-2 lg:col-span-3 lg:col-start-1 lg:row-span-5 lg:row-start-1'>
          <Calendar admin initialData={upcomingAppointments} />
        </div>
        <div className='order-4 h-[300px] md:h-full lg:col-span-3 lg:col-start-1 lg:row-span-3 lg:row-start-6'>
          <div className='h-full pb-12 pr-2 lg:pr-6'>
            <AppointmentChart data={chartData} />
          </div>
        </div>
        <div className='order-1 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-1'>
          <Today appointments={todaysAppointments} />
        </div>
        <div className='order-3 lg:col-span-2 lg:col-start-4 lg:row-span-4 lg:row-start-5'>
          <RecentlyBooked initialData={recentlyBooked} />
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default AdminHomePage;
