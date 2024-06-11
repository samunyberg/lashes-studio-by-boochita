import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { MdLogout } from 'react-icons/md';
import { MotionContainer } from '../common/MotionContainer';

interface Props {
  user: {
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
  };
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileMenu = ({ user, setOpen }: Props) => {
  return (
    <MotionContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className='absolute right-0 top-10 z-50 w-56 py-2 text-sm'
    >
      <div className='flex flex-col items-start justify-center gap-3 rounded-sm border-l-4 border-accent bg-white px-6 py-4 shadow'>
        <p>
          Signed in as{' '}
          <span className='w-32 whitespace-normal font-medium'>
            {user.name}
          </span>
        </p>
        <hr className='w-full border-accent' />
        {user.isAdmin && (
          <Link href={'/admin'} onClick={() => setOpen(false)}>
            Admin Area
          </Link>
        )}
        <Link href='/account' onClick={() => setOpen(false)}>
          My Account
        </Link>
        <hr className='w-full border-accent' />
        <div className='flex gap-1'>
          <MdLogout size={20} />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </div>
    </MotionContainer>
  );
};

export default ProfileMenu;
