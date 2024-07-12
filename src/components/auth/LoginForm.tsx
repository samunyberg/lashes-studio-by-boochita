'use client';

import useLanguage from '@/hooks/useLanguage';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import Input from '../common/forms/Input';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getLabel } = useLanguage();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError('');
      setIsSubmitting(true);
      const signInResult = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (signInResult?.error) {
        setError('Invalid email or password');
      }
      if (signInResult?.ok) {
        toast.success(`Signed in as ${credentials.email}`);
        router.push(searchParams.get('callbackUrl') || '/');
      }
    } catch (error) {
      setError('Something went wrong. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='login' />} />
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={login}>
        <Input
          type='text'
          name='email'
          placeholder={getLabel('email')}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <PasswordInput
          name='password'
          placeholder={getLabel('password')}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button variant='accent' isLoading={isSubmitting}>
          <Label labelId='login' />
        </Button>
      </form>
      <div className='flex flex-col gap-2'>
        <span>
          <Label labelId='no_account' />{' '}
          <Link href={'/auth/register'} className='text-accent'>
            <Label labelId='register_here' />
          </Link>
        </span>
        <span>
          <Label labelId='forgot_password' />{' '}
          <Link href={'/auth/forgotten-password'} className='text-accent'>
            <Label labelId='click_here' />
          </Link>
        </span>
      </div>
    </AuthFormContainer>
  );
};

export default LoginForm;
