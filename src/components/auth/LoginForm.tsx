'use client';

import StrikeThroughText from '@/components/common/StrikeThroughText';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button';
import Input from '../common/Input';
import AuthFormContainer from './AuthFormContainer';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [passWord, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: name,
        password: passWord,
      });
      if (result?.error) setError('Invalid email or password');
      if (result?.ok) toast.success(`Signed in as ${name}`);
    } catch (error) {
      setError('Something went wrong. Please try again');
    }
  };

  const ErrorMessage = () => (
    <div className="mb-4 rounded-sm border-2 border-red-300 bg-bgSoft px-4 py-4 text-center">
      {error}
    </div>
  );

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
      <h1 className="text-center text-xl uppercase lg:text-2xl">
        Lashes Studio by Boochita
      </h1>
      <StrikeThroughText className="my-6">Login</StrikeThroughText>
      {error && <ErrorMessage />}
      <form className="mb-8 flex flex-col gap-6" action={login}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Login" type="submit" variant="accent" />
      </form>
      <Links />
    </AuthFormContainer>
  );
};

export default LoginForm;
