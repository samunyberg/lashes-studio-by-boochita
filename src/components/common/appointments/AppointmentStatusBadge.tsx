import { Status } from '@prisma/client';
import { cn } from 'clsx-tailwind-merge';
import Label from '../Label';

interface Props {
  status: Status;
}

const AppointmentStatusBadge = ({ status }: Props) => {
  return (
    <div
      className={cn('w-[90px] rounded-sm border-2 bg-bgSoft text-center', {
        'border-red-400 text-red-700': status === 'BOOKED',
        'border-green-400 text-green-700': status === 'AVAILABLE',
        'border-orange-400 text-orange-800': status === 'UNAVAILABLE',
      })}
    >
      <p className='text-sm font-medium'>
        <Label labelId={status.toLowerCase()} />
      </p>
    </div>
  );
};

export default AppointmentStatusBadge;
