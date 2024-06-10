import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import ProfileMenu from './ProfileMenu';

const NavAuth = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { status, data: session } = useSession();

  const clipName = (name: string) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];
    return (firstName.substring(0, 1) + lastName.substring(0, 1)).toUpperCase();
  };

  return (
    <div className='relative'>
      {status === 'loading' && (
        <ThreeDots height='30' width='30' color='#a87397' visible={true} />
      )}
      {status === 'unauthenticated' && (
        <div className='flex cursor-pointer gap-1 border-l-2 border-accent bg-bgSoft px-2 py-1 text-sm'>
          <Link href={'/auth/login'}>Login</Link>
          <span>|</span>
          <Link href={'/auth/register'}>Register</Link>
        </div>
      )}
      {status === 'authenticated' && (
        <div>
          <div
            className='flex cursor-pointer items-center justify-center rounded-full border-2 border-accent bg-bgSoft p-2 text-sm'
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span className='tracking-wider'>
              {clipName(session.user!.name)}
            </span>
          </div>
          {isMenuOpen && (
            <ProfileMenu user={session.user} setOpen={setMenuOpen} />
          )}
        </div>
      )}
    </div>
  );
};

export default NavAuth;
