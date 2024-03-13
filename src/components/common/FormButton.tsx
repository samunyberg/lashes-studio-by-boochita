'use client';

import { useFormStatus } from 'react-dom';
import Button from './Button';

interface Props {
  label: string;
  variant: 'primary' | 'accent';
}

const FormButton = ({ label, variant }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button label={label} variant={variant} type="submit" isLoading={pending} />
  );
};

export default FormButton;
