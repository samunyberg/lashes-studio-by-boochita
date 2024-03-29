import { ChangeEvent } from 'react';

interface Props {
  name: string;
  type: 'text' | 'password';
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({ name, type, placeholder, onChange, error }: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      <input
        className={`rounded-sm p-2 transition-all focus:outline focus:outline-accent ${error ? 'outline outline-red-300' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className='text-red-400'>{error}</div>}
    </div>
  );
};

export default Input;
