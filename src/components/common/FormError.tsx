import { PropsWithChildren } from 'react';

const FormError = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <div className="mb-4 rounded-sm border-4 border-red-300 bg-bgSoft px-4 py-4 text-center">
      {children}
    </div>
  );
};

export default FormError;
