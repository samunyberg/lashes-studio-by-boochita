'use client';

import useLanguage from '@/hooks/useLanguage';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import PasswordInput from '../common/forms/PasswordInput';
import Label from '../common/Label';
import AuthFormContainer from './AuthFormContainer';
import AuthFormHeader from './AuthFormHeader';
import PasswordStrength from './PasswordStrength';

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
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
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
  }, [isRegistered, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidationErrors({});
    setError('');

    const validationResult = registerFormSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setValidationErrors(fieldErrors);
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
        setIsRegistered(true);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    if (id === 'password' || id === 'confirmPassword')
      setFormData({ ...formData, [id]: value });
    else setFormData({ ...formData, [id]: value.trim() });
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader subtitle={<Label labelId='register' />} />
      <FormError className='mb-4'>{error}</FormError>
      <form className='mb-8 flex flex-col gap-6' onSubmit={handleSubmit}>
        <FormGroup error={validationErrors.firstName?.at(0)}>
          <Input
            id='firstName'
            value={formData.firstName}
            type='text'
            placeholder={getLabel('first_name')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.lastName?.at(0)}>
          <Input
            id='lastName'
            value={formData.lastName}
            type='text'
            placeholder={getLabel('last_name')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.email?.at(0)}>
          <Input
            id='email'
            name='email'
            type='text'
            value={formData.email}
            placeholder={getLabel('email')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.password?.at(0)}>
          <PasswordInput
            id='password'
            value={formData.password}
            placeholder={getLabel('password')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <PasswordStrength password={formData.password} />
        <FormGroup error={validationErrors.confirmPassword?.at(0)}>
          <PasswordInput
            id='confirmPassword'
            value={formData.confirmPassword}
            placeholder={getLabel('confirm_password')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup error={validationErrors.phone?.at(0)}>
          <Input
            id='phone'
            value={formData.phone}
            type='text'
            placeholder={getLabel('phone')}
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button variant='accent' isLoading={isSubmitting}>
          <Label labelId='register' />
        </Button>
      </form>
      <span>
        <Label labelId='already_have_account' />{' '}
        <Link href={'/auth/login'} className='text-accent'>
          <Label labelId='click_here' />
        </Link>
      </span>
    </AuthFormContainer>
  );
};

export default RegisterForm;
