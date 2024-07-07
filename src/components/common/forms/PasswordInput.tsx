import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  error?: string;
}

const PasswordInput = ({
  id,
  label,
  placeholder,
  isPassword,
  error,
  ...rest
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative flex w-full'>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        {...rest}
      />
      <div
        className='absolute right-0 flex h-full items-center justify-center px-3'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </div>
    </div>
  );
};

export default PasswordInput;
