'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import PasswordStrength from './PasswordStrength';

interface FieldErrors {
  oldPassword?: string[];
  password?: string[];
  confirmPassword?: string[];
}

interface Props {
  userId: string;
  onClose: () => void;
}

const ChangePasswordForm = ({ userId, onClose }: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputErrors, setInputErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
  const { getLabel } = useLanguage();
  const { changePasswordFormSchema } = useLocalisedFormSchema();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = changePasswordFormSchema.safeParse({
      oldPassword,
      password,
      confirmPassword,
    });
    if (!validation.success) {
      setInputErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      setInputErrors({});
      setError('');
      setIsSubmitting(true);
      await axios.patch(`/api/users/${userId}/change-password`, {
        oldPassword,
        password,
        confirmPassword,
      });
      setIsSubmitting(false);
      toast.success('Password changed successfully');
      onClose();
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again');
    }
  };

  return (
    <>
      <h2 className='p-2 text-lg font-medium'>
        <Label labelId='change_password' />
      </h2>
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-5 mt-2 flex flex-col gap-6' onSubmit={handleSubmit}>
        <FormGroup error={inputErrors.oldPassword?.at(0)}>
          <PasswordInput
            name='oldPassword'
            placeholder={getLabel('old_password')}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup error={inputErrors.password?.at(0)}>
          <PasswordInput
            name='password'
            placeholder={getLabel('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <PasswordStrength password={password} />
        <FormGroup error={inputErrors.confirmPassword?.at(0)}>
          <PasswordInput
            name='confirmPassword'
            placeholder={getLabel('confirm_password')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          <Label labelId='send' />
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
