'use client';

import { cn } from 'clsx-tailwind-merge';
import { ThreeDots } from 'react-loader-spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: 'primary' | 'accent';
  isLoading?: boolean;
}

const Button = ({ label, variant, isLoading, ...rest }: Props) => {
  return (
    <button
      className={cn(
        'flex h-10 items-center justify-center rounded-sm border-2 border-primary p-2 px-4 font-medium tracking-wide transition-all disabled:cursor-not-allowed disabled:text-opacity-50',
        {
          'bg-transparent disabled:border-opacity-50': variant === 'primary',
          'bg-accent text-white disabled:bg-opacity-50': variant === 'accent',
        }
      )}
      {...rest}
    >
      {isLoading ? <ThreeDots color='#fff' height={30} width={30} /> : label}
    </button>
  );
};

export default Button;
