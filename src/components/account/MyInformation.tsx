'use client';

import { UserWithAppointments } from '@/app/lib/types';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import Label from '../common/Label';

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
}

interface Props {
  user: UserWithAppointments;
}

const MyInformation = ({ user }: Props) => {
  const router = useRouter();
  const { editAccountSchema } = useLocalisedFormSchema();
  const [editable, setEditable] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [errors, setErrors] = useState({} as FieldErrors);
  const [serverError, setServerError] = useState('');

  const handleEditFormClose = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setServerError('');
    setErrors({});

    setEditable(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrors({});
    setServerError('');

    const validationResult = editAccountSchema.safeParse({
      firstName,
      lastName,
      email,
      phone,
    });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(`api/users/${user.id}/edit`, {
        firstName,
        lastName,
        email,
        phone,
      });
      setIsSubmitting(false);
      setEditable(false);
      toast.success('Information updated');
      router.refresh();
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.error);
      } else setServerError('Whoops! Something went wrong.');
    }
  };

  const handleClosePasswordForm = () => setShowChangePasswordForm(false);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='mb-2 text-lg font-semibold'>
          <Label labelId='my_information' />
        </h2>
        <div className='relative mb-4 flex flex-col gap-4 rounded-sm bg-bgSoft p-4 font-medium shadow'>
          {editable && <FormError>{serverError}</FormError>}
          <div className='flex flex-col gap-1'>
            <p className='font-semibold'>
              <Label labelId='first_name' />
            </p>
            {editable ? (
              <FormGroup error={errors.firstName?.at(0)}>
                <Input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </FormGroup>
            ) : (
              <>
                <hr className='border-accent' />
                <span className='pl-2'>{user.firstName}</span>
              </>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>
              <Label labelId='last_name' />
            </p>
            {editable ? (
              <FormGroup error={errors.lastName?.at(0)}>
                <Input
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </FormGroup>
            ) : (
              <>
                <hr className='border-accent' />
                <span className='pl-2'>{user.lastName}</span>
              </>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>
              <Label labelId='email' />
            </p>
            {editable ? (
              <FormGroup error={errors.email?.at(0)}>
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormGroup>
            ) : (
              <>
                <hr className='border-accent' />
                <span className='pl-2'>{user.email}</span>
              </>
            )}
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>
              <Label labelId='phone' />
            </p>
            {editable ? (
              <FormGroup error={errors.phone?.at(0)}>
                <Input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </FormGroup>
            ) : (
              <>
                <hr className='border-accent' />
                <span className='pl-2'>{user.phone}</span>
              </>
            )}
          </div>
        </div>
        {editable ? (
          <div className='flex flex-col gap-4 lg:flex-row'>
            <Button
              variant='accent'
              className='w-full lg:w-fit'
              type='submit'
              isLoading={isSubmitting}
            >
              <Label labelId='edit' />
            </Button>
            <Button
              variant='primary'
              className='w-full lg:w-fit'
              onClick={handleEditFormClose}
            >
              <Label labelId='cancel' />
            </Button>
          </div>
        ) : (
          <Button
            variant='primary'
            className='w-full lg:w-fit'
            onClick={() => setEditable(!editable)}
          >
            <Label labelId='edit' />
          </Button>
        )}
      </form>
      {!showChangePasswordForm ? (
        <Button
          variant='accent'
          className='my-12 w-full lg:w-fit'
          onClick={() => setShowChangePasswordForm(true)}
        >
          <Label labelId='change_password' />
        </Button>
      ) : (
        <div className='mt-4'>
          <ChangePasswordForm
            userId={user.id}
            onClose={handleClosePasswordForm}
          />
          <Button
            className='w-full'
            onClick={() => setShowChangePasswordForm(false)}
          >
            <Label labelId='cancel' />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyInformation;
