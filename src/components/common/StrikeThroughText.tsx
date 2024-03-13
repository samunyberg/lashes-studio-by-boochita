import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

const StrikeThroughText = ({ children, className }: Props) => {
  return (
    <div className={`${className || ''} flex gap-2`}>
      <div className="flex flex-1 items-center">
        <div className="h-[2px] w-full bg-accent"></div>
      </div>
      <h1 className="text-xl uppercase">{children}</h1>
      <div className="flex flex-1 items-center">
        <div className="h-[2px] w-full bg-accent"></div>
      </div>
    </div>
  );
};

export default StrikeThroughText;
