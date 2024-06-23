import { cn } from 'clsx-tailwind-merge';

const passwdStrengthLabels = ['Weak', 'Low', 'Medium', 'Strong'];

const PasswordStrength = ({ passwdStrength }: { passwdStrength: number }) => {
  return (
    <div className='px-4'>
      <p className='mb-2 text-sm'>
        Password strength:{' '}
        <span className='font-semibold'>
          {passwdStrengthLabels[passwdStrength]}
        </span>
      </p>
      <div className='flex h-2 overflow-hidden rounded-full border border-primary shadow-sm'>
        <div
          className={cn('h-full transition-all', {
            'w-[15%] bg-red-400': passwdStrength === 0,
            'w-[35%] bg-orange-300': passwdStrength === 1,
            'w-[65%] bg-green-300': passwdStrength === 2,
            'w-[100%] bg-green-400': passwdStrength === 3,
          })}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
