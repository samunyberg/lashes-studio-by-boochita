import { PropsWithChildren } from 'react';

const DashboardHeader = ({ children }: PropsWithChildren) => {
  return (
    <h1 className='mb-6 bg-bgMain text-lg font-semibold uppercase md:mb-3 lg:border-b lg:border-accent lg:text-base'>
      {children}
    </h1>
  );
};

export default DashboardHeader;
