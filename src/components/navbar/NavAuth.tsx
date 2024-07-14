import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Label from '../common/Label';
import ProfileMenu from './ProfileMenu';

const NavAuth = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { status, data: session } = useSession();

  const handleToggleProfileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative'>
      {status === 'loading' && (
        <ThreeDots height='30' width='30' color='#524237' visible={true} />
      )}
      {status === 'unauthenticated' && (
        <div className='flex cursor-pointer gap-1 border-l-2 border-accent bg-bgSoft px-2 py-1 text-sm shadow'>
          <Link href={'/auth/login'}>
            <Label labelId='login' />
          </Link>
          <span>|</span>
          <Link href={'/auth/register'}>
            <Label labelId='register' />
          </Link>
        </div>
      )}
      {status === 'authenticated' && (
        <div>
          <div
            className={`flex size-9 cursor-pointer items-center justify-center rounded-full border border-accent bg-bgSoft text-sm shadow ${isMenuOpen && 'bg-white'}`}
            onClick={() => {
              if (!isMenuOpen) setIsMenuOpen(true);
              else return;
            }}
          >
            <span className='font-medium tracking-wider'>
              {session.user.firstName.substring(0, 1) +
                session.user.lastName.substring(0, 1).toUpperCase()}
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
