'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { passwordStrength } from 'check-password-strength';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import Input from '../common/forms/Input';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';
import FormGroup from '../common/forms/FormGroup';
import InputError from '../common/forms/InputError';
import PasswordInput from '../common/forms/PasswordInput';

interface FieldErrors {
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
  const { registerFormSchema } = useLocalisedFormSchema();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwdStrength, setPasswdStrenth] = useState(0);
  const [errors, setErrors] = useState({} as FieldErrors);
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
    if (isRegistered) router.push('/');
  }, [isRegistered]);

  useEffect(() => {
    const strength = passwordStrength(formData.password);
    setPasswdStrenth(strength.id);
  }, [formData.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});
    setServerError('');

    const validationResult = registerFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/users/register', formData);

      let signinResponse;
      if (response.status === 201)
        signinResponse = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
      if (signinResponse?.ok) {
        setIsSubmitting(false);
        setIsRegistered(true);
      }
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof AxiosError)
        setServerError(error.response?.data.error);
      else
        setServerError('Whoops! Something went wrong. Please try again later.');
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='register' />} />
      <FormError className='mb-4'>{serverError}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={handleSubmit}>
        <FormGroup error={errors.firstName?.at(0)}>
          <Input
            name='firstName'
            value={formData.firstName}
            type='text'
            placeholder={getLabel('first_name')}
            onChange={(event) =>
              setFormData({ ...formData, firstName: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup error={errors.lastName?.at(0)}>
          <Input
            name='lastName'
            value={formData.lastName}
            type='text'
            placeholder={getLabel('last_name')}
            onChange={(event) =>
              setFormData({ ...formData, lastName: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup error={errors.email?.at(0)}>
          <Input
            type='text'
            name='email'
            value={formData.email}
            placeholder={getLabel('email')}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup error={errors.password?.at(0)}>
          <PasswordInput
            name='password'
            value={formData.password}
            placeholder={getLabel('password')}
            onChange={(event) =>
              setFormData({ ...formData, password: event.target.value })
            }
          />
        </FormGroup>
        {formData.password && (
          <PasswordStrength passwdStrength={passwdStrength} />
        )}
        <FormGroup error={errors.confirmPassword?.at(0)}>
          <PasswordInput
            name='confirmPassword'
            value={formData.confirmPassword}
            placeholder={getLabel('confirm_password')}
            onChange={(event) =>
              setFormData({ ...formData, confirmPassword: event.target.value })
            }
          />
        </FormGroup>
        <FormGroup error={errors.phone?.at(0)}>
          <Input
            name='phone'
            value={formData.phone}
            type='text'
            placeholder={getLabel('phone')}
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
          />
        </FormGroup>
        <Button variant='accent' isLoading={isSubmitting}>
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
