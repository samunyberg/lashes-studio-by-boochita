'use client';

import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import LanguageSwitcher from './LanguageSwitcher';
import NavAuth from './NavAuth';
import NavLinks from './NavLinks';
import NavLogo from './NavLogo';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
  };

  return (
    <>
      <Sidebar isOpen={sidebarOpened} onToggleSidebar={handleToggleSidebar} />
      <nav className='sticky inset-x-0 top-0 z-40 flex h-[55px] items-center bg-bgMain px-5 py-3 xl:px-0'>
        <div className='container mx-auto flex items-center justify-between'>
          <button className='lg:hidden' onClick={() => setSidebarOpened(true)}>
            <FiMenu size={25} />
          </button>
          <NavLogo />
          <div className='flex flex-row items-center gap-5'>
            <div className='hidden lg:inline'>
              <NavLinks />
            </div>
            <LanguageSwitcher />
            <NavAuth />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
