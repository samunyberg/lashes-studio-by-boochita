'use client';

import registerUser from '@/actions/registerUser';
import { passwordStrength } from 'check-password-strength';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import FormError from '../common/FormError';
import Input from '../common/Input';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

const RegisterForm = () => {
  const [formState, action] = useFormState(registerUser, { errors: {} });
  const [passwdStrength, setPasswdStrenth] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const strength = passwordStrength(password);
    setPasswdStrenth(strength.id);
  }, [password]);

  const links = (
    <span>
      Already have an account? Login{' '}
      <Link href={'/auth/login'} className='text-accent underline'>
        here
      </Link>
    </span>
  );

  const ShowPasswordCheckBox = () => (
    <div
      className='flex cursor-pointer gap-2 self-end'
      onClick={() => setShowPassword(!showPassword)}
    >
      <p className='text-sm'>Show passwords</p>
      <CheckBox isChecked={showPassword} />
    </div>
  );

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle='Register' />
      <FormError className='mb-4'>{formState.errors._form?.at(0)}</FormError>
      <form className='mb-8 flex flex-col gap-6' action={action}>
        <Input
          name='name'
          type='text'
          placeholder='First and last name'
          error={formState.errors.name?.at(0)}
        />
        <Input
          type='text'
          name='email'
          placeholder='Email'
          error={formState.errors.email?.at(0)}
        />
        <Input
          name='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          error={formState.errors.password?.at(0)}
        />
        {password && <PasswordStrength passwdStrength={passwdStrength} />}
        <Input
          name='confirmPassword'
          type={showPassword ? 'text' : 'password'}
          placeholder='Confirm password'
          error={formState.errors.confirmPassword?.at(0)}
        />
        {ShowPasswordCheckBox()}
        <Input
          name='phone'
          type='text'
          placeholder='Phone'
          error={formState.errors.phone?.at(0)}
        />
        <Button label='Register' variant='accent' />
      </form>
      {links}
    </AuthFormContainer>
  );
};

export default RegisterForm;
