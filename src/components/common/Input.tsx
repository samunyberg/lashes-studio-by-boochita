import { ChangeEvent } from 'react';

interface Props {
  name: string;
  type: 'text' | 'password';
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, type, placeholder, onChange }: Props) => {
  return (
    <input
      className="rounded-sm p-2 focus:outline focus:outline-accent"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
