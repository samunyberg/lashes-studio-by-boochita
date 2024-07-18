'use client';

import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import { MotionContainer } from '@/components/common/MotionContainer';
import Panel from '@/components/common/Panel';
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
    <div className='h-[calc(100vh-55px)] pt-32 md:mx-auto md:max-w-[350px] lg:max-w-[450px]'>
      <Panel className='flex flex-col items-center justify-center gap-4 py-12 px-5'>
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <BsCheckCircle size={90} />
        </MotionContainer>
        <h1 className='text-lg font-semibold'>
          <Label labelId='thank_you' />
        </h1>
        <p className='mb-5 text-center font-medium'>
          <Label labelId='booking_confirmed' />{' '}
          <span className='font-semibold'>{email}</span>.
        </p>
        <div className='flex w-full flex-col gap-4'>
          <Button variant='accent' onClick={() => router.push('/')}>
            <Label labelId='home' />
          </Button>
          <Button
            variant='primary'
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
          >
            <Label labelId='logout' />
          </Button>
        </div>
      </Panel>
    </div>
  );
};

export default ThankYouPage;
