'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const ForgottenPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputError, setInputError] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const { getLabel } = useLanguage();
  const { forgottenPasswordFormSchema } = useLocalisedFormSchema();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = forgottenPasswordFormSchema.safeParse({ email });
    if (!validation.success) {
      setInputError(validation.error.flatten().fieldErrors.email?.at(0));
      return;
    }

    try {
      setInputError('');
      setIsSubmitting(true);
      await axios.post('/api/users/forgotten-password', { email });
      setIsSubmitting(false);
      setEmail('');
      toast.success('Email sent successfully');
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Something went wrong. Please try again');
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='forgotten_password' />} />
      <FormError className='mb-4'>{error}</FormError>
      <Label labelId='click_send_to_change_receive_link' />
      <form className='mb-8 mt-5 flex flex-col gap-6' onSubmit={handleSubmit}>
        <FormGroup error={inputError}>
          <Input
            type='text'
            name='email'
            value={email}
            placeholder={getLabel('email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button variant='accent' isLoading={isSubmitting}>
          <Label labelId='send' />
        </Button>
      </form>
      <Link href='/auth/login' className='text-accent'>
        <Label labelId='back' />
      </Link>
    </AuthFormContainer>
  );
};

export default ForgottenPasswordForm;
