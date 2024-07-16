'use client';

import { formatDate } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import useLocale from '@/hooks/useLocale';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Button from '../common/Button';
import Label from '../common/Label';
import Panel from '../common/Panel';

const Today = () => {
  const [appointments, setAppointments] = useState<AppointmentWithAllData[]>();
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get<AppointmentWithAllData[]>(
          '/api/appointments/today'
        );
        setAppointments(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1 className='mb-5 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
        <Label labelId='today' />,{' '}
        {formatDate(new Date(), locale, {
          day: '2-digit',
          month: 'long',
        })}
      </h1>
      {isLoading ? (
        <div className='flex h-32 w-full items-center justify-center'>
          <ThreeDots color='#524237' height={8} />
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          {appointments?.length === 0 ? (
            <Panel className='px-4 py-3'>
              No appointments for today. Enjoy your day off!
            </Panel>
          ) : (
            <div className='flex flex-col gap-2'>
              {appointments?.map((app) => (
                <AppointmentPanel
                  key={app.id}
                  appointment={app}
                  showDate={false}
                />
              ))}
            </div>
          )}
          <Button
            variant='accent'
            className='lg:w-fit lg:self-end'
            onClick={() => router.push('/admin/appointments')}
          >
            View all
          </Button>
        </div>
      )}
    </div>
  );
};

export default Today;
