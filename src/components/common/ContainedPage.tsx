import { PropsWithChildren } from 'react';

const ContainedPage = ({ children }: PropsWithChildren) => {
  return (
    <div className='md:mx-auto md:max-w-[450px] lg:max-w-[650px]'>
      {children}
    </div>
  );
};

export default ContainedPage;
