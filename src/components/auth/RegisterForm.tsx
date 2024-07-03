'use client';

import useLanguage from '@/hooks/useLanguage';
import useRegisterFormSchema from '@/hooks/useRegisterFormSchema';
import axios, { AxiosError } from 'axios';
import { passwordStrength } from 'check-password-strength';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import FormError from '../common/FormError';
import Input from '../common/Input';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

interface FormErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  phone?: string[];
}

const RegisterForm = () => {
  const { getLabel } = useLanguage();
  const router = useRouter();
  const registerFormSchema = useRegisterFormSchema();
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwdStrength, setPasswdStrenth] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  useEffect(() => {
    if (isRegistered) router.push('/auth/login?registrationSuccess=true');
  }, [isRegistered]);

  useEffect(() => {
    const strength = passwordStrength(formData.password);
    setPasswdStrenth(strength.id);
  }, [formData.password]);

  const ShowPasswordCheckBox = () => (
    <div
      className='flex cursor-pointer gap-2 self-end'
      onClick={() => setShowPassword(!showPassword)}
    >
      <p className='text-sm'>Show passwords</p>
      <CheckBox isChecked={showPassword} />
    </div>
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = registerFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      await axios.post('/api/auth/register', formData);
      setIsRegistered(true);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409)
          setServerError('User with this email already exists.');
        else if (error.response?.status === 400)
          setServerError('Invalid input. Please check your data.');
        else
          setServerError(
            'Whoops! Something went wrong. Please try again later.'
          );
      } else
        setServerError('Whoops! Something went wrong. Please try again later.');
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='register' />} />
      <FormError className='mb-4'>{serverError}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={handleSubmit}>
        <Input
          name='firstName'
          value={formData.firstName}
          type='text'
          placeholder={getLabel('first_name')}
          onChange={(event) =>
            setFormData({ ...formData, firstName: event.target.value })
          }
          error={errors.firstName?.at(0)}
        />
        <Input
          name='lastName'
          value={formData.lastName}
          type='text'
          placeholder={getLabel('last_name')}
          onChange={(event) =>
            setFormData({ ...formData, lastName: event.target.value })
          }
          error={errors.lastName?.at(0)}
        />
        <Input
          type='text'
          name='email'
          value={formData.email}
          placeholder={getLabel('email')}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          error={errors.email?.at(0)}
        />
        <Input
          name='password'
          value={formData.password}
          type={showPassword ? 'text' : 'password'}
          placeholder={getLabel('password')}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
          error={errors.password?.at(0)}
        />
        {formData.password && (
          <PasswordStrength passwdStrength={passwdStrength} />
        )}
        <Input
          name='confirmPassword'
          value={formData.confirmPassword}
          type={showPassword ? 'text' : 'password'}
          placeholder={getLabel('confirm_password')}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event.target.value })
          }
          error={errors.confirmPassword?.at(0)}
        />
        {ShowPasswordCheckBox()}
        <Input
          name='phone'
          value={formData.phone}
          type='text'
          placeholder={getLabel('phone')}
          onChange={(event) =>
            setFormData({ ...formData, phone: event.target.value })
          }
          error={errors.phone?.at(0)}
        />
        <Button variant='accent'>
          <Label labelId='register' />
        </Button>
      </form>
      <span>
        <Label labelId='already_have_account' />{' '}
        <Link href={'/auth/login'} className='text-accent underline'>
          <Label labelId='click_here' />
        </Link>
      </span>
    </AuthFormContainer>
  );
};

export default RegisterForm;
