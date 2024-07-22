const NotFoundPage = () => {
  return (
    <div className='flex h-[calc(100vh-55px)] items-center justify-center'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='border-b border-primary text-2xl font-bold'>404</h1>
        <p className='font-medium'>Sorry, this page doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
