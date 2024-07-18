'use client';

import { formatDate } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import useLocale from '@/hooks/useLocale';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Label from '../common/Label';

interface Props {
  initialData: AppointmentWithAllData[];
}

const RecentlyBooked = ({ initialData }: Props) => {
  const locale = useLocale();
  const { data: appointments = initialData, error } = useQuery<
    AppointmentWithAllData[],
    Error
  >({
    queryKey: ['recently-booked'],
    queryFn: () =>
      axios
        .get<AppointmentWithAllData[]>('/api/appointments/recent')
        .then((res) => res.data),
    refetchInterval: 5 * 60 * 1000,
    initialData: initialData,
  });

  const isBookedLessThanOneHourAgo = (app: AppointmentWithAllData) => {
    return (
      new Date().getTime() - new Date(app.bookedAt!).getTime() <= 60 * 60 * 1000
    );
  };

  if (error) return <div>Error fetching the data</div>;

  if (appointments?.length === 0)
    return <div>No new bookings within 3 days.</div>;

  return (
    <div className='flex h-full flex-col'>
      <h1 className='mb-3 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
        <Label labelId='recently_booked' />
      </h1>
      <div className='flex h-full flex-col gap-6 lg:overflow-y-auto lg:scroll-smooth lg:pr-2'>
        {appointments?.map((app) => (
          <div
            key={app.id}
            className='flex flex-col gap-2 font-medium last-of-type:mb-5'
          >
            <div className='flex items-center justify-between gap-2'>
              <div>
                <span>
                  {formatDate(app.bookedAt!, locale, {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <span className='mx-2'>•</span>
                <span>
                  {app.client?.firstName} {app.client?.lastName} booked:
                </span>
              </div>
              {isBookedLessThanOneHourAgo(app) && (
                <span className='rounded-sm bg-accent px-1 text-sm text-white shadow'>
                  New
                </span>
              )}
            </div>
            <AppointmentPanel appointment={app} showClient={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyBooked;
