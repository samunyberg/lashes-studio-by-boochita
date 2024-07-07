import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const FormError = ({ children, className }: Props) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-sm border border-red-400 bg-bgSoft py-2 text-center text-red-400 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default FormError;
