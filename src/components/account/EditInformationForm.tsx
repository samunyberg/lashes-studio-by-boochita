import { UserWithAppointments } from '@/app/lib/types';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';
import Label from '../common/Label';
import Panel from '../common/Panel';

interface FieldErrors {
  firstName?: string[];
  lastName?: string[];
  email?: string[];
  phone?: string[];
}

interface Props {
  user: UserWithAppointments;
  onClose: () => void;
}

const EditInformationForm = ({ user, onClose }: Props) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({} as FieldErrors);
  const [serverError, setServerError] = useState('');
  const { editAccountSchema } = useLocalisedFormSchema();
  const router = useRouter();

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setServerError('');
    setErrors({});

    onClose();
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
      router.refresh();
      onClose();
      toast.success('Information updated');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setServerError(error.response?.data.error);
      } else setServerError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Panel className='relative mb-5 flex flex-col gap-4 p-4 '>
        <FormError>{serverError}</FormError>
        <div className='flex flex-col gap-1'>
          <p className='font-semibold'>
            <Label labelId='first_name' />
          </p>
          <FormGroup error={errors.firstName?.at(0)}>
            <Input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </FormGroup>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='last_name' />
          </p>
          <FormGroup error={errors.lastName?.at(0)}>
            <Input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </FormGroup>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='email' />
          </p>
          <FormGroup error={errors.email?.at(0)}>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='phone' />
          </p>
          <FormGroup error={errors.phone?.at(0)}>
            <Input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </FormGroup>
        </div>
      </Panel>
      <div className='flex flex-col gap-4 lg:flex-row'>
        <Button
          type='submit'
          variant='accent'
          className='w-full lg:w-fit'
          isLoading={isSubmitting}
        >
          <Label labelId='edit' />
        </Button>
        <Button
          type='button'
          variant='primary'
          className='w-full lg:w-fit'
          onClick={handleCancel}
        >
          <Label labelId='cancel' />
        </Button>
      </div>
    </form>
  );
};

export default EditInformationForm;
