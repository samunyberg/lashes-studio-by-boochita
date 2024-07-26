import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UploadImage from './UploadImage';

interface Props {
  onClose: () => void;
}

interface FieldErrors {
  name?: string[];
  description?: string[];
}

const NewServiceForm = ({ onClose }: Props) => {
  const router = useRouter();
  const { newServiceSchema } = useLocalisedFormSchema();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageId, setImageId] = useState('');
  const [validationErrors, setValidationErrors] = useState({} as FieldErrors);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = newServiceSchema.safeParse({ name, description });
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    try {
      setError('');
      setValidationErrors({});
      setIsSubmitting(true);
      await axios.post('/api/services', { name, description, imageId });
      onClose();
      router.refresh();
      toast.success('Service created!');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (id: string) => setImageId(id);

  const handleCancel = () => {
    setError('');
    setValidationErrors({});
    setName('');
    setDescription('');
    setImageId('');

    onClose();
  };

  return (
    <form className='mb-8 mt-5 flex flex-col gap-5' onSubmit={handleSubmit}>
      <FormError>{error}</FormError>
      <FormGroup label='Name' error={validationErrors.name?.at(0)}>
        <Input
          id='name'
          value={name}
          type='text'
          placeholder='Name'
          onChange={(event) => setName(event.target.value)}
        />
      </FormGroup>
      <FormGroup
        label='Description'
        error={validationErrors.description?.at(0)}
      >
        <Input
          id='description'
          value={description}
          type='text'
          placeholder='Description'
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormGroup>
      <UploadImage onImageSelect={handleImageSelect} imageId={imageId} />
      <div className='mt-5 flex flex-col gap-2'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          Create
        </Button>
        <Button type='button' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NewServiceForm;
