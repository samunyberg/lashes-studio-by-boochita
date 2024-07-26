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
  const { getLabel } = useLanguage();
  const { changePasswordFormSchema } = useLocalisedFormSchema();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = changePasswordFormSchema.safeParse({
      oldPassword,
      password,
      confirmPassword,
    });
    if (!validation.success) {
      setValidationErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationErrors({});
      setError('');
      await axios.patch(`/api/users/${userId}/change-password`, {
        oldPassword,
        password,
        confirmPassword,
      });
      toast.success('Password changed successfully');
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setValidationErrors({});
    setError('');
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');

    onClose();
  };

  return (
    <form className='mt-5 flex flex-col gap-4 px-2' onSubmit={handleSubmit}>
      <FormError className='mb-4'>{error}</FormError>
      <FormGroup error={validationErrors.oldPassword?.at(0)}>
        <PasswordInput
          id='currentPassword'
          label='Current password'
          placeholder={getLabel('old_password')}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup error={validationErrors.password?.at(0)}>
        <PasswordInput
          id='newPassword'
          label='New password'
          placeholder={getLabel('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <PasswordStrength password={password} />
      <FormGroup error={validationErrors.confirmPassword?.at(0)}>
        <PasswordInput
          id='confirmNewPassword'
          label='Confirm new password'
          placeholder={getLabel('confirm_password')}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button
        className='mt-5'
        type='submit'
        variant='accent'
        isLoading={isSubmitting}
      >
        <Label labelId='change' />
      </Button>
      <Button type='button' className='w-full' onClick={handleCancel}>
        <Label labelId='cancel' />
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
