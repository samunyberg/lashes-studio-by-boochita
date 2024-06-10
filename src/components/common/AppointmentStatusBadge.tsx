import { Status } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';

const AppointmentStatusBadge = ({ status }: { status: Status }) => {
  const statusLabel =
    status.substring(0, 1) + status.substring(1).toLowerCase();

  return (
    <div
      className={cn(
        'flex w-28 items-center justify-center rounded-full border-2 py-1',
        {
          'border-red-400': status === 'BOOKED',
          'border-green-400': status === 'AVAILABLE',
          'border-orange-300': status === 'UNAVAILABLE',
        }
      )}
    >
      <p className='text-sm'>{statusLabel}</p>
    </div>
  );
};

export default AppointmentStatusBadge;
