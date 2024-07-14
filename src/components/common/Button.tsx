'use client';

import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { ThreeDots } from 'react-loader-spinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  variant?: 'primary' | 'accent';
  isLoading?: boolean;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  isLoading,
  className,
  ...rest
}: Props) => {
  return (
    <button
      className={cn(
        `${className ? className : ''} flex h-8 min-w-[80px] items-center justify-center rounded-sm border-2 border-primary px-3 py-2 text-sm font-medium tracking-wide transition-all disabled:cursor-not-allowed disabled:text-opacity-50`,
        {
          'bg-transparent hover:bg-primaryButtonHover disabled:border-opacity-50':
            variant === 'primary',
          'bg-accent text-white hover:bg-accentButtonHover disabled:bg-opacity-50':
            variant === 'accent',
        }
      )}
      {...rest}
    >
      {isLoading ? <ThreeDots color='#fff' height={30} width={30} /> : children}
    </button>
  );
};

export default Button;
