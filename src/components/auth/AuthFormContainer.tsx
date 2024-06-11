import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-6 md:px-0'>
      <div className='w-full bg-bgSoft px-4 py-12 shadow md:max-w-[350px] md:px-6 lg:max-w-[450px]'>
        {children}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthFormContainer;
