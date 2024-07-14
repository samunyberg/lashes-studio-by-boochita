'use client';

import { formatDate } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import useLocale from '@/hooks/useLocale';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Label from '../common/Label';

const RecentlyBooked = () => {
  const [appointments, setAppointments] = useState<AppointmentWithAllData[]>();
  const [isLoading, setIsLoading] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<AppointmentWithAllData[]>(
          '/api/appointments/recent'
        );
        setAppointments(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (appointments?.length === 0)
    return <div>No new bookings within 3 days.</div>;

  return (
    <div className='flex h-full flex-col'>
      <h1 className='mb-5 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
        <Label labelId='recently_booked' />
      </h1>
      {isLoading ? (
        <div>
          {' '}
          <ThreeDots color='#524237' height={8} />
        </div>
      ) : (
        <div className='flex h-full flex-col gap-6 lg:overflow-y-auto lg:scroll-smooth lg:pr-2'>
          {appointments?.map((app) => (
            <div
              key={app.id}
              className='flex flex-col gap-2 font-medium last-of-type:mb-5'
            >
              <div className='flex gap-2'>
                <span>
                  {formatDate(app.bookedAt!, locale, {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span>•</span>
                <span>
                  {app.client?.firstName} {app.client?.lastName} booked:
                </span>
              </div>
              <AppointmentPanel appointment={app} showClient={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyBooked;
