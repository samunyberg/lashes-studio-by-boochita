'use client';

import useClickOutside from '@/hooks/useClickOutside';
import { cn } from 'clsx-tailwind-merge';
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
import NavLinks from './NavLinks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: Props) => {
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, () => onClose());

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'fixed -left-[45%] z-[999] h-screen w-[45%] bg-bgSoft px-5 py-4 shadow-md backdrop-blur-lg transition-all',
        {
          'left-0': isOpen,
        }
      )}
    >
      <div className='flex justify-between'>
        <MdClose size={30} onClick={() => onClose()} />
        <LanguageSwitcher />
      </div>
      <NavLinks onLinkClick={() => onClose()} />
    </aside>
  );
};

export default Sidebar;
