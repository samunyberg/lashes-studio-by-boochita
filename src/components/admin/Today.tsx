'use client';

import { formatDate } from '@/app/lib/dates';
import { AppointmentWithAllData } from '@/app/lib/types';
import AppointmentPanel from '../common/appointments/AppointmentPanel';
import Button from '../common/Button';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface Props {
  appointments: AppointmentWithAllData[];
}

const Today = ({ appointments }: Props) => {
  return (
    <div>
      <h1 className='mb-3 border-b border-accent bg-bgMain text-base font-semibold uppercase'>
        <Label labelId='today' />,{' '}
        {formatDate(new Date(), 'en-FI', {
          day: '2-digit',
          month: 'long',
        })}
      </h1>
      <div className='flex flex-col gap-5'>
        {appointments.length === 0 ? (
          <Panel className='px-4 py-3'>
            No appointments for today. Enjoy your day off!
          </Panel>
        ) : (
          <div className='flex flex-col gap-2'>
            {appointments.map((app) => (
              <AppointmentPanel
                key={app.id}
                appointment={app}
                showDate={false}
              />
            ))}
          </div>
        )}
        <Button variant='accent' className='lg:w-fit lg:self-end'>
          View all
        </Button>
      </div>
    </div>
  );
};

export default Today;
