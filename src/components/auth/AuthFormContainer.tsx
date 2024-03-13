import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthFormContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="w-full bg-bgSoft px-4 py-12 shadow md:max-w-[350px] md:px-6 lg:max-w-[450px]">
        {children}
      </div>
      <ToastContainer />
    </>
  );
};

export default AuthFormContainer;
