import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { ClientWithAppointments } from '@/lib/types';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
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
  user: ClientWithAppointments;
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
      <div className='flex flex-col gap-4'>
        <FormError>{serverError}</FormError>
        <FormGroup
          error={errors.firstName?.at(0)}
          label={<Label labelId='first_name' />}
        >
          <Input
            id='firstName'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          error={errors.lastName?.at(0)}
          label={<Label labelId='last_name' />}
        >
          <Input
            id='lastName'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          error={errors.email?.at(0)}
          label={<Label labelId='email' />}
        >
          <Input
            id='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormGroup>
        <FormGroup
          error={errors.phone?.at(0)}
          label={<Label labelId='phone' />}
        >
          <Input
            id='phone'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </FormGroup>
      </div>
      <div className='mt-8 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          <Label labelId='edit' />
        </Button>
        <Button type='button' variant='primary' onClick={handleCancel}>
          <Label labelId='cancel' />
        </Button>
      </div>
    </form>
  );
};

export default EditInformationForm;
