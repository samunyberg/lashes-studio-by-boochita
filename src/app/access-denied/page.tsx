import Button from '@/components/common/Button';
import Label from '@/components/common/Label';
import Link from 'next/link';
import { MdBlock } from 'react-icons/md';

const AccessDeniedPage = () => {
  return (
    <div className='h-[calc(100vh-4rem)]'>
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <div className='mb-5 flex items-center gap-2 text-center'>
          <MdBlock size={30} />
          <h1 className='text-2xl font-bold'>
            <Label labelId='restricted_area' />
          </h1>
        </div>
        <h2 className='mb-12 text-center text-lg font-medium'>
          <Label labelId='trying_to_access_restricted_area' />
        </h2>
        <Link href='/'>
          <Button variant='accent'>
            <Label labelId='back' />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
