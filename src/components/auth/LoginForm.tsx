'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormButton from '../common/FormButton';
import FormError from '../common/FormError';
import Input from '../common/Input';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const result = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (result?.error) setError('Invalid email or password');
      if (result?.ok) toast.success(`Signed in as ${credentials.email}`);
    } catch (error) {
      setError('Something went wrong. Please try again');
    }
  };

  const Links = () => (
    <div className="flex flex-col gap-2">
      <span className="">
        Don&#39;t have an account? Register{' '}
        <Link href={'/auth/register'} className="text-accent underline">
          here
        </Link>
      </span>
      <span>
        Forgot your password? Click{' '}
        <Link
          href={'/auth/forgotten-password'}
          className="text-accent underline"
        >
          here
        </Link>
      </span>
    </div>
  );

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle="Login" />
      <FormError>{error}</FormError>
      <form className="mb-8 flex flex-col gap-6" action={login}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <FormButton label="Login" variant="accent" />
      </form>
      <Links />
    </AuthFormContainer>
  );
};

export default LoginForm;
