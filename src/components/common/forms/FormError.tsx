import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const FormError = ({ children, className = '' }: Props) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-sm bg-red-200 px-2 py-2 text-center text-red-500 ${className}`}
    >
      {children}
    </div>
  );
};

export default FormError;
