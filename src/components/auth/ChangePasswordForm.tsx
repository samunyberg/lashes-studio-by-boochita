'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { signOut } from 'next-auth/react';
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
  newPassword?: string[];
  confirmNewPassword?: string[];
}

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface Props {
  onClose: () => void;
}

const ChangePasswordForm = ({ onClose }: Props) => {
  const { getLabel } = useLanguage();
  const { changePasswordFormSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState({} as FormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = changePasswordFormSchema.safeParse(formData);
    if (!validation.success) {
      setValidationErrors(validation.error.flatten().fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      clearErrors();
      await axios.patch(`/api/auth/change-password`, formData);
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSuccess = async () => {
    onClose();
    await signOut({ redirect: true, callbackUrl: '/auth/login' });
    toast.success(
      'Password changed successfully. Please login with your new password.'
    );
  };

  const handleCancel = () => {
    clearErrors();
    setFormData({} as FormData);
    onClose();
  };

  const clearErrors = () => {
    setError('');
    setValidationErrors({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <FormError className='mb-4'>{error}</FormError>
      <FormGroup
        error={validationErrors.oldPassword?.at(0)}
        label='Current password'
      >
        <PasswordInput
          id='oldPassword'
          placeholder={getLabel('old_password')}
          value={formData.oldPassword}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup
        error={validationErrors.newPassword?.at(0)}
        label='New password'
      >
        <PasswordInput
          id='newPassword'
          placeholder={getLabel('password')}
          value={formData.newPassword}
          onChange={handleInputChange}
        />
      </FormGroup>
      <PasswordStrength password={formData.newPassword} />
      <FormGroup
        error={validationErrors.confirmNewPassword?.at(0)}
        label='Confirm new password'
      >
        <PasswordInput
          id='confirmNewPassword'
          placeholder={getLabel('confirm_password')}
          value={formData.confirmNewPassword}
          onChange={handleInputChange}
        />
      </FormGroup>
      <div className='mt-8 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          <Label labelId='change' />
        </Button>
        <Button type='button' onClick={handleCancel}>
          <Label labelId='cancel' />
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
