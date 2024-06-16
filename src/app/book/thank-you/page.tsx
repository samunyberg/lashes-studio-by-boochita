'use client';

import Button from '@/components/common/Button';
import { MotionContainer } from '@/components/common/MotionContainer';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BsCheckCircle } from 'react-icons/bs';

interface Props {
  searchParams: {
    email: string;
  };
}

const ThankYouPage = ({ searchParams: { email } }: Props) => {
  const router = useRouter();

  return (
    <div className='h-[calc(100vh-4rem)] pt-32'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <BsCheckCircle size={90} />
        </MotionContainer>
        <h1 className='text-lg font-semibold'>Thank You!</h1>
        <p className='mb-5 text-center'>
          Your booking is confirmed. A confirmation email was sent to{' '}
          <span className='font-semibold'>{email}</span>.
        </p>
        <div className='flex w-full flex-col gap-4'>
          <Button
            label='To Home Page'
            variant='accent'
            onClick={() => router.push('/')}
          />
          <Button
            label='Logout'
            variant='primary'
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          />
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
