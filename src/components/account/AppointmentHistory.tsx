'use client';

import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import {
  formatDate,
  groupAppointmentsByMonth,
} from '@/lib/utils/dateAndTimeUtils';
import AppointmentPanel from '../common/appointments/appointmentPanel/AppointmentPanel';

interface Props {
  appointments: AppointmentWithData[];
  onAppointmentClick?: (app: AppointmentWithData) => void;
}

const AppointmentHistory = ({ appointments, onAppointmentClick }: Props) => {
  const locale = useLocale();

  if (appointments.length === 0)
    return <p className='font-medium'>Ei menneitä varauksia.</p>;

  const groupedAppointments = groupAppointmentsByMonth(appointments);

  const renderGroupHeader = (month: string) => {
    return (
      <span className='text-lg font-semibold'>
        {formatDate(new Date(month), locale, {
          month: 'long',
          year: 'numeric',
        })}
      </span>
    );
  };

  const renderGroupAppointments = (month: string) => {
    return (
      <div className='mb-8 mt-2 flex flex-col gap-2'>
        {groupedAppointments[month].map((app) => (
          <div
            key={app.id}
            onClick={() => onAppointmentClick && onAppointmentClick(app)}
          >
            <AppointmentPanel appointment={app} showService showPrice />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='w-full'>
      {Object.keys(groupedAppointments).map((month, index) => {
        return (
          <div key={index}>
            {renderGroupHeader(month)}
            {renderGroupAppointments(month)}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentHistory;
