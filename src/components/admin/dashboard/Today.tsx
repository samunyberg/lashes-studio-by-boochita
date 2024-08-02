import useLocale from '@/hooks/useLocale';
import { AppointmentWithData } from '@/lib/types';
import { formatDate } from '@/lib/utils/dateAndTimeUtils';
import { useRouter } from 'next/navigation';
import AppointmentPanel from '../../common/appointments/appointmentPanel/AppointmentPanel';
import Button from '../../common/Button';
import Label from '../../common/Label';
import Panel from '../../common/Panel';
import DashboardHeader from './DashboardHeader';

interface Props {
  appointments: AppointmentWithData[];
}

const Today = ({ appointments }: Props) => {
  const locale = useLocale();
  const router = useRouter();

  return (
    <div>
      <DashboardHeader>
        <Label labelId='today' />,{' '}
        {formatDate(new Date(), locale, {
          day: '2-digit',
          month: 'long',
        })}
      </DashboardHeader>
      <div className='flex flex-col gap-5'>
        {appointments.length === 0 ? (
          <Panel className='px-4 py-3'>
            <Label labelId='now_appointments_today' />
          </Panel>
        ) : (
          <div className='flex flex-col gap-2'>
            {appointments.map((app) => (
              <div
                key={app.id}
                onClick={() => router.push(`/admin/appointments/${app.id}`)}
              >
                {app.status === 'AVAILABLE' || app.status === 'UNAVAILABLE' ? (
                  <AppointmentPanel
                    key={app.id}
                    appointment={app}
                    showDate={false}
                    showStatusBadge
                  />
                ) : (
                  <AppointmentPanel
                    key={app.id}
                    appointment={app}
                    showDate={false}
                    showClient
                    showService
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <Button
          variant='accent'
          className='lg:w-fit lg:self-end'
          onClick={() => router.push('/admin/appointments')}
        >
          <Label labelId='view_all' />
        </Button>
      </div>
    </div>
  );
};

export default Today;
