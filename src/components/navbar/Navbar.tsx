'use client';

import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import Sidebar from './Sidebar';

const Navbar = () => {
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
      <Sidebar isOpen={sidebarOpened} toggleSidebar={setSidebar} />
      <nav
        className={`sticky bg-${color} shadow-${shadow} inset-x-0 top-0 z-50 h-14 px-5 py-4 backdrop-blur-md transition-all duration-500 ease-in xl:px-0`}
      >
        <div className="container mx-auto flex justify-between">
          <button className="lg:hidden" onClick={() => setSidebar(true)}>
            <FiMenu size={30} />
          </button>
          <NavLogo />
          <div className="flex flex-row items-center gap-5">
            <div className="hidden lg:inline">
              <NavLinks />
            </div>
            {/* <ProfileMenu /> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
