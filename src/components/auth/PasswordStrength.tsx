import { cn } from 'clsx-tailwind-merge';

const passwdStrengthLabels = ['Weak', 'Low', 'Medium', 'Strong'];

const PasswordStrength = ({ passwdStrength }: { passwdStrength: number }) => {
  return (
    <div className='flex items-center gap-4'>
      <p className='whitespace-nowrap text-sm font-medium'>
        Strength:{' '}
        <span className='font-semibold'>
          {passwdStrengthLabels[passwdStrength]}
        </span>
      </p>
      <div
        className={cn('flex h-2 w-full rounded-full transition-all', {
          'w-[15%] bg-red-400': passwdStrength === 0,
          'w-[35%] bg-orange-300': passwdStrength === 1,
          'w-[65%] bg-green-300': passwdStrength === 2,
          'w-[100%] bg-green-400': passwdStrength === 3,
        })}
      ></div>
    </div>
  );
};

export default PasswordStrength;
