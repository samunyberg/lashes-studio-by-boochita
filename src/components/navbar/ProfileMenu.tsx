import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { MdLogout } from 'react-icons/md';
import { MotionContainer } from '../common/MotionContainer';
import Panel from '../common/Panel';

interface Props {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  };
  onClose: () => void;
}

const ProfileMenu = ({ user, onClose }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      className='absolute right-0 top-0 z-50 w-56 rounded-sm text-sm'
    >
      <Panel className='flex flex-col items-start justify-center gap-3 !bg-white px-6 py-4'>
        <p>
          Signed in as{' '}
          <span className='w-32 whitespace-normal font-medium'>
            {user.email}
          </span>
        </p>
        <hr className='w-full border-accent' />
        {user.isAdmin && (
          <Link href={'/admin'} onClick={() => onClose()}>
            Admin Area
          </Link>
        )}
        <Link href='/account' onClick={() => onClose()}>
          My Account
        </Link>
        <hr className='w-full border-accent' />
        <div className='flex gap-1'>
          <MdLogout size={20} />
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </Panel>
    </MotionContainer>
  );
};

export default ProfileMenu;
