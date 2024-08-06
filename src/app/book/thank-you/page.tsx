'use client';

import Button from '@/components/common/Button';
import CheckMark from '@/components/common/checkmark/CheckMark';
import Label from '@/components/common/Label';
import Panel from '@/components/common/Panel';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ThankYouPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='h-[calc(100vh-55px)] pt-32 md:mx-auto md:max-w-[350px] lg:max-w-[450px]'>
      <Panel className='flex flex-col items-center justify-center gap-4 px-5 py-12'>
        <CheckMark text={<Label labelId='thank_you' />} />
        <p className='mb-5 text-center font-medium'>
          <Label labelId='booking_confirmed' />{' '}
          <span className='font-semibold'>{session?.user.email}</span>.
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
