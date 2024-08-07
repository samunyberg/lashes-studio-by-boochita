import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Label from '../common/Label';

const links = [
  { href: '/', label: <Label labelId='home' /> },
  { href: '/book', label: <Label labelId='book' /> },
  { href: '/services', label: <Label labelId='services' /> },
  { href: '/about', label: <Label labelId='about' /> },
  { href: '/contact', label: <Label labelId='contact' /> },
];

interface Props {
  onLinkClick?: () => void;
}

const NavLinks = ({ onLinkClick }: Props) => {
  const pathName = usePathname();

  const renderedLinks = links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={onLinkClick}
      className={cn(
        `cursor-pointer px-2 text-[15px] font-medium uppercase tracking-wide opacity-90 transition-all`,
        {
          'border-b border-primary font-semibold opacity-100':
            pathName === link.href,
          'lg:hidden': link.href === '/',
        }
      )}
    >
      {link.label}
    </Link>
  ));

  return (
    <div className='flex flex-col gap-8 whitespace-nowrap pt-12 lg:flex-row lg:gap-4 lg:pt-0'>
      {renderedLinks}
    </div>
  );
};

export default NavLinks;
