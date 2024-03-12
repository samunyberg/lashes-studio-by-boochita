'use client';

import { cn } from 'clsx-tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { GiClawSlashes } from 'react-icons/gi';
import Sidebar from './Sidebar';

const links = [
  { href: '/book', label: 'Book' },
  { href: '/services', label: 'Services' },
  { href: '/hours', label: 'Business Hours' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const pathName = usePathname();

  const [sidebarOpened, setSidebar] = useState(false);
  const [color, setColor] = useState('transparent');
  const [shadow, setShadow] = useState('none');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setColor('bgSoft');
        setShadow('md');
      } else {
        setColor('transparent');
        setShadow('none');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Sidebar
        links={links}
        isOpen={sidebarOpened}
        toggleSidebar={setSidebar}
      />
      <nav
        className={`sticky bg-${color} shadow-${shadow} inset-x-0 top-0 z-50 h-14 px-5 py-4 backdrop-blur-md transition-all duration-700 md:px-0`}
      >
        <div className="container mx-auto flex justify-between">
          <button className="lg:hidden" onClick={() => setSidebar(true)}>
            <FiMenu size={30} />
          </button>
          <Link href="/">
            <div className="hidden whitespace-nowrap text-lg font-normal uppercase tracking-wide lg:flex lg:items-center lg:gap-2">
              <GiClawSlashes size={20} />
              Lashes Studio by Boochita
            </div>
          </Link>
          <div className="lg:flex lg:flex-row lg:items-center lg:gap-5">
            <div className="hidden lg:flex lg:gap-5 lg:whitespace-nowrap">
              {links.map((link) => (
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
              ))}
            </div>
            {/* <ProfileMenu /> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
