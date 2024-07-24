import {
  getMonthlyAppointmentsCount,
  getRecentlyBookedAppointments,
  getTodaysAppointments,
  getUpcomingAppointments,
} from '@/app/lib/db/appointments';
import Dashboard from '@/components/admin/dashboard/Dashboard';

const AdminHomePage = async () => {
  const upcomingAppointments = await getUpcomingAppointments();
  const todaysAppointments = await getTodaysAppointments();
  const recentlyBooked = await getRecentlyBookedAppointments();
  const chartData = await getMonthlyAppointmentsCount();

  return (
    <Dashboard
      upcomingAppointments={upcomingAppointments}
      todaysAppointments={todaysAppointments}
      recentlyBooked={recentlyBooked}
      chartData={chartData}
    />
  );
};

export const dynamic = 'force-dynamic';

export default AdminHomePage;
