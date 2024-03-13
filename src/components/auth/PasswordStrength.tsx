import { cn } from 'clsx-tailwind-merge';

const passwdStrengthLabels = ['Weak', 'Low', 'Medium', 'Strong'];

const PasswordStrength = ({ passwdStrength }: { passwdStrength: number }) => {
  return (
    <div className="rounded-sm bg-bgSoft px-2 py-4 shadow-sm">
      <p className="mb-2 text-sm">
        Password strength:{' '}
        <span className="font-semibold">
          {passwdStrengthLabels[passwdStrength]}
        </span>
      </p>
      <div className="flex gap-2">
        {Array.from({ length: passwdStrength + 1 }).map((i, index) => (
          <div
            key={index}
            className={cn('h-1 w-[25%] shadow-sm shadow-gray-500', {
              'bg-red-400': passwdStrength === 0,
              'bg-orange-300': passwdStrength === 1,
              'bg-green-300': passwdStrength === 2,
              'bg-green-400': passwdStrength === 3,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
