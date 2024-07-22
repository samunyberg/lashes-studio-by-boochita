'use client';

import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/appointments', label: 'Appointments' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/services', label: 'Services' },
];

const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className='flex h-[55px] items-center justify-evenly gap-1 lg:justify-start lg:gap-2'>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'h-full  p-2 transition-all active:text-accent lg:hover:text-accent',
            {
              'font-semibold': pathName === link.href,
            }
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
