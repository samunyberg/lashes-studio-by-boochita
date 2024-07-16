import Navigation from '@/components/admin/Navigation';
import { PropsWithChildren } from 'react';

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className='lg:sticky lg:inset-x-0 lg:top-[55px] lg:bg-bgMain'>
        <Navigation />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
