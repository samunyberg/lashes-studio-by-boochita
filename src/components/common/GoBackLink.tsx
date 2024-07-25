'use client';

import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

const GoBackLink = () => {
  const router = useRouter();

  return (
    <div
      className='flex cursor-pointer items-center gap-1 font-medium'
      onClick={() => router.back()}
    >
      <IoArrowBack size={20} />
      <span>Go back</span>
    </div>
  );
};

export default GoBackLink;
