'use client';

import { cn } from 'clsx-tailwind-merge';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className='flex flex-row justify-between gap-2'>
      <span
        className={cn('h-full p-2', {
          'font-semibold': pathName === '/admin',
        })}
      >
        Dashboard
      </span>
      <span className='h-full p-2'>Appointments</span>
      <span className='h-full p-2'>Users</span>
      <span className='h-full p-2'>Services</span>
    </div>
  );
};

export default Navigation;
