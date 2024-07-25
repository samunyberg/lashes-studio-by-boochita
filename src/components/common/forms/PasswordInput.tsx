import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
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
    <div className='relative flex w-full justify-between'>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        icon={
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </div>
        }
        {...rest}
      />
    </div>
  );
};

export default PasswordInput;
