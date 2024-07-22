'use client';

import { ThreeDots } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='flex h-[calc(100vh-55px)] items-center justify-center'>
      <ThreeDots height={10} color='#524237' />
    </div>
  );
};

export default Loading;
