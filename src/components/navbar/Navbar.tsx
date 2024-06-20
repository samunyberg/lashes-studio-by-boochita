'use client';

import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import NavAuth from './NavAuth';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [color, setColor] = useState('transparent');
  const [shadow, setShadow] = useState('none');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
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

  const handleToggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpened} onToggleSidebar={handleToggleSidebar} />
      <nav
        className={`sticky bg-${color} shadow-${shadow} inset-x-0 top-0 z-50 flex h-[55px] items-center px-5 py-3 backdrop-blur-md transition-all ease-in xl:px-0`}
      >
        <div className='container mx-auto flex items-center justify-between'>
          <button className='lg:hidden' onClick={() => setSidebarOpened(true)}>
            <FiMenu size={25} />
          </button>
          <NavLogo />
          <div className='flex flex-row items-center gap-5'>
            <div className='hidden lg:inline'>
              <NavLinks />
            </div>
            <NavAuth />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
