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
        `${className ? className : ''} flex h-10 w-full min-w-[80px] items-center justify-center rounded-sm border-2 border-primary px-4 text-base font-medium tracking-wide transition-all disabled:cursor-not-allowed disabled:text-opacity-50 lg:w-fit lg:text-sm`,
        {
          'bg-transparent active:bg-primaryButtonHover disabled:border-opacity-50 lg:hover:bg-primaryButtonHover':
            variant === 'primary',
          'bg-accent text-white active:bg-accentButtonHover disabled:bg-opacity-50 lg:hover:bg-accentButtonHover':
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
