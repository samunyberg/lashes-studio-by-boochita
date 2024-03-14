'use client';

import { cn } from 'clsx-tailwind-merge';
import { ThreeDots } from 'react-loader-spinner';

interface Props {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant: 'primary' | 'accent';
  isLoading?: boolean;
}

const Button = ({ label, type, variant, isLoading }: Props) => {
  return (
    <button
      type={type}
      className={cn(
        'flex h-10 items-center justify-center rounded-sm border-2 border-primary p-2 px-4 font-medium tracking-wide transition-all hover:bg-accent hover:text-white',
        {
          'bg-accent text-white': variant === 'accent',
        }
      )}
    >
      {isLoading ? <ThreeDots color='#fff' height={30} width={30} /> : label}
    </button>
  );
};

export default Button;
