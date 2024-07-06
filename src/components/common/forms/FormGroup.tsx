import { ReactNode } from 'react';
import InputError from './InputError';

interface Props {
    children: ReactNode;
    error?: string,
}

const FormGroup = ({ children, error }: Props) => {
  return (
    <div className={`flex w-full flex-col gap-1 ${error && 'group invalid'}`}>
      {children}
      <InputError>{error}</InputError>
    </div>
  );
};

export default FormGroup;
