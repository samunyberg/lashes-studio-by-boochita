import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: Props) => {
  return (
    <div className={`mx-auto md:max-w-2xl lg:max-w-4xl ${className}`}>
      {children}
    </div>
  );
};

export default Container;
