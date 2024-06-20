import Button from '@/components/common/Button';
import Link from 'next/link';
import { MdBlock } from 'react-icons/md';

const AccessDeniedPage = () => {
  return (
    <div className='h-[calc(100vh-4rem)]'>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='mb-5 flex items-center gap-2 text-center'>
          <MdBlock size={30} />
          <h1 className='text-2xl font-bold'>Restricted Area</h1>
        </div>
        <h2 className='mb-12 text-xl font-medium'>
          Sorry, looks you were trying to access a restricted page.
        </h2>
        <div>
          <Link href='/'>
            <Button variant='accent' label='Back Home' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
