import { PropsWithChildren } from 'react';

const AuthPage = ({ children }: PropsWithChildren) => {
  return (
    <div className='container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-2 py-6 md:px-0'>
      {children}
    </div>
  );
};

export default AuthPage;
