import { PropsWithChildren } from 'react';

const FormError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div className='mb-4 rounded-sm border-2 border-red-300 bg-bgSoft px-4 py-3 text-center text-red-400'>
      {children}
    </div>
  );
};

export default FormError;
