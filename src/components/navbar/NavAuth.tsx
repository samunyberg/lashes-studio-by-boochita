import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ProfileMenu from './ProfileMenu';

const NavAuth = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, data: session } = useSession();

  const handleToggleProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clipName = (name: string) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    return (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
  };

  return (
    <div className='relative'>
      {status === 'loading' && (
        <ThreeDots height='30' width='30' color='#524237' visible={true} />
      )}
      {status === 'unauthenticated' && (
        <div className='flex cursor-pointer gap-1 border-l-2 border-accent bg-bgSoft px-2 py-1 text-sm shadow'>
          <Link href={'/auth/login'}>Login</Link>
          <span>|</span>
          <Link href={'/auth/register'}>Register</Link>
        </div>
      )}
      {status === 'authenticated' && (
        <div>
          <div
            className={`cursor-pointer rounded-sm border-l-4 border-accent bg-bgSoft px-2 py-1 text-sm shadow ${isMenuOpen && 'bg-white'}`}
            onClick={() => {
              if (!isMenuOpen) setIsMenuOpen(true);
              else return;
            }}
          >
            <span className='tracking-wider'>
              {clipName(session.user!.name)}
            </span>
          </div>
          {isMenuOpen && (
            <ProfileMenu
              user={session.user}
              onClose={handleToggleProfileMenu}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NavAuth;
