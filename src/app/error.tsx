'use client';

const ErrorPage = () => {
  return (
    <div className='flex h-[calc(100vh-55px)] items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold'>Whoops!</h1>
        <p className='font-medium'>Sorry, an unexpected error occured.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
