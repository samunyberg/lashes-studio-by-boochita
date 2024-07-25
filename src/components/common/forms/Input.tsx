import { ReactNode } from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
  placeholder?: string;
  icon?: ReactNode;
}

const Input = ({ className, id, placeholder, icon, ...rest }: Props) => {
  return (
    <div className={`w-full bg-bgSoft ${className && className}`}>
      <div className='flex h-10 w-full justify-between rounded-sm font-medium outline outline-1 outline-black/20 transition-all group-[.invalid]:outline-2 group-[.invalid]:outline-red-400 has-[:focus]:outline-2 has-[:focus]:outline-accent'>
        <input
          id={id}
          className='h-full flex-1 bg-inherit pl-2 placeholder:text-sm focus:outline-none'
          placeholder={placeholder}
          {...rest}
        />
        {icon && (
          <span className='flex h-full items-center justify-center px-2'>
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
