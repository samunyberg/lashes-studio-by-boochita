'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/FormError';
import Input from '../common/Input';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const LoginForm = ({
  registrationSuccess,
}: {
  registrationSuccess?: string;
}) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (result?.error) setError('Invalid email or password');
      if (result?.ok) {
        toast.success(`Signed in as ${credentials.email}`);
        router.push(searchParams.get('callbackUrl') || '/');
      }
    } catch (error) {
      setError('Something went wrong. Please try again');
    }
  };

  const Links = () => (
    <div className='flex flex-col gap-2'>
      <span className=''>
        Don&#39;t have an account? Register{' '}
        <Link href={'/auth/register'} className='text-accent underline'>
          here
        </Link>
      </span>
      <span>
        Forgot your password? Click{' '}
        <Link
          href={'/auth/forgotten-password'}
          className='text-accent underline'
        >
          here
        </Link>
      </span>
    </div>
  );

  return (
    <AuthFormContainer>
      {registrationSuccess === 'true' && (
        <div className='mb-8 flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-green-400 bg-white px-4 py-4'>
          <p className='text-lg'>Registration successful!</p>
          <p className='text-balance'>
            Thank you for registering, please continue by signing in to your new
            account.
          </p>
        </div>
      )}
      <AuthFormHeader subtitle='Login' />
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={login}>
        <Input
          type='text'
          name='email'
          placeholder='Email'
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button label='Login' variant='accent' />
      </form>
      <Links />
    </AuthFormContainer>
  );
};

export default LoginForm;
