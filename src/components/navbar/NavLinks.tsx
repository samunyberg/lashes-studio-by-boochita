import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/book', label: 'Book' },
  { href: '/services', label: 'Services' },
  { href: '/hours', label: 'Business Hours' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface Props {
  onLinkClick?: () => void;
}

const NavLinks = ({ onLinkClick }: Props) => {
  const pathName = usePathname();

  const renderedLinks = links.map((link) => (
    <Link
      key={link.label}
      href={link.href}
      onClick={onLinkClick}
      className={cn(
        `cursor-pointer px-2 font-normal uppercase tracking-wide opacity-90 transition-all`,
        {
          'border-b border-primary font-medium opacity-100':
            pathName === link.href,
          'lg:hidden': link.label === 'Home',
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
