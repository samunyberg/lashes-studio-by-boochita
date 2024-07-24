import { PropsWithChildren } from 'react';

const DashboardHeader = ({ children }: PropsWithChildren) => {
  return (
    <h1 className='mb-6 bg-bgMain text-center text-base font-semibold uppercase md:mb-3 lg:border-b lg:border-accent lg:text-start'>
      {children}
    </h1>
  );
};

export default DashboardHeader;
