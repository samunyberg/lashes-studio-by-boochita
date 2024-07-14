'use client';

import { formatDate, formatTime } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import useLanguage from '@/hooks/useLanguage';
import { useRouter } from 'next/navigation';
import AppointmentStatusBadge from '../common/appointments/AppointmentStatusBadge';

const AppointmentList = ({
  appointments,
}: {
  appointments: AppointmentWithAllData[];
}) => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const locale = `${currentLanguage}-FI`;

  return (
    <div className='mx-auto h-full w-[70%]'>
      <h1 className='mb-6 mt-6 text-lg lg:mt-0'>Upcoming Appointments</h1>
      <table className='w-full'>
        <thead className='font-normal'>
          <tr>
            <th className='p-2 text-start'>Date</th>
            <th className='p-2 text-start'>Status</th>
            <th className='p-2 text-start'>Time</th>
            <th className='p-2 text-start'>Client</th>
            <th className='hidden p-2 text-start lg:inline-flex'>Service</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr
              key={app.id}
              className='cursor-pointer border-b border-accent transition-all even:bg-white/20 hover:bg-bgSoft'
              onClick={() => router.push('/admin/appointments/' + app.id)}
            >
              <td className='p-3'>{formatDate(app.dateTime, locale)}</td>
              <td className='p-3'>
                <AppointmentStatusBadge status={app.status} />
              </td>
              <td className='p-3'>{formatTime(app.dateTime, locale)}</td>
              <td className='p-3 font-medium'>
                {app.client?.firstName} {app.client?.lastName}
              </td>
              <td className='hidden p-3 font-medium lg:inline-flex'>
                {app.service?.name}, {app.serviceOption?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
