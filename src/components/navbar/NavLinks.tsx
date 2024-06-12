import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/book', label: 'Book' },
  { href: '/services', label: 'Services' },
  { href: '/hours', label: 'Business Hours' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const NavLinks = () => {
  const pathName = usePathname();

  const renderedLinks = links.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      className={cn(
        `cursor-pointer px-2 font-normal uppercase tracking-wide opacity-90 transition-all`,
        {
          'border-b border-primary font-medium opacity-100':
            pathName === link.href,
        }
      )}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className='flex flex-col gap-8 whitespace-nowrap lg:flex-row lg:gap-4'>
      {renderedLinks}
    </div>
  );
};

export default NavLinks;
