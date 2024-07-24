import { Status } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import Label from '../Label';

interface Props {
  status: Status;
}

const AppointmentStatusBadge = ({ status }: Props) => {
  return (
    <div
      className={cn('w-[95px] rounded-md border-2 bg-bgSoft py-1 text-center', {
        'border-red-400': status === 'BOOKED',
        'border-green-400': status === 'AVAILABLE',
        'border-orange-300': status === 'UNAVAILABLE',
      })}
    >
      <p className='text-sm font-medium'>
        <Label labelId={status.toLowerCase()} />
      </p>
    </div>
  );
};

export default AppointmentStatusBadge;
