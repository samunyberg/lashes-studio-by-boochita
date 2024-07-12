import { cn } from 'clsx-tailwind-merge';
import React, { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  border?: boolean;
  className?: string;
}

const Panel = ({ children, className, border = false, ...rest }: Props) => {
  return (
    <div
      className={cn(`${className && className} bg-bgSoft font-medium shadow`, {
        'border-l-4 border-accent': border,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Panel;
