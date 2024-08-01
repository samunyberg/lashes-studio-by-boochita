'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { cn } from 'clsx-tailwind-merge';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
import NavLinks from './NavLinks';

interface Props {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar = ({ isOpen, onToggleSidebar }: Props) => {
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, () => onToggleSidebar());

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'fixed inset-y-0 -left-[45%] z-[999] w-[45%] bg-bgSoft px-5 py-4 shadow-md backdrop-blur-lg transition-all',
        {
          'left-0': isOpen,
        }
      )}
    >
      <div className='flex justify-between'>
        <MdClose size={30} onClick={() => onToggleSidebar()} />
        <LanguageSwitcher />
      </div>
      <NavLinks onLinkClick={onToggleSidebar} />
    </aside>
  );
};

export default Sidebar;
