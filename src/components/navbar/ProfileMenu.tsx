import useClickOutside from '@/hooks/useClickOutside';
import { SessionUser } from '@/lib/types';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRef } from 'react';
import { MdLogout } from 'react-icons/md';
import { MotionContainer } from '../common/MotionContainer';
import Panel from '../common/Panel';

interface Props {
  user: SessionUser;
  onClose: () => void;
}

const ProfileMenu = ({ user, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => onClose());

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
    onClose();
  };

  return (
    <MotionContainer
      ref={menuRef}
      initial={{ opacity: 0, right: -20 }}
      animate={{ opacity: 1, right: 0 }}
      transition={{ duration: 0.2 }}
      className='absolute right-0 top-0 z-[999] w-60 rounded-sm text-sm'
    >
      <Panel className='flex flex-col items-start justify-center gap-3 !bg-white px-6 py-4'>
        <div className='flex flex-wrap'>
          <span className='whitespace-normal break-all font-semibold'>
            {user.email}
          </span>
        </div>
        <hr className='w-full border-black/20' />
        {user.isAdmin && (
          <Link href={'/admin'} onClick={() => onClose()}>
            Admin Area
          </Link>
        )}
        <Link href={`/account/${user.id}`} onClick={() => onClose()}>
          My Account
        </Link>
        <hr className='w-full border-black/20' />
        <div className='flex gap-1'>
          <MdLogout size={20} />
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </Panel>
    </MotionContainer>
  );
};

export default ProfileMenu;
