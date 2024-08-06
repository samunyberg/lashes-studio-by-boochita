import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Service } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import UploadImage from './UploadImage';

interface Props {
  service?: Service;
  onClose: () => void;
}

interface FormData {
  name: string;
  description_en: string;
  description_fi: string;
  imageId: string;
}

interface FieldErrors {
  name?: string[];
  description_en?: string[];
  description_fi?: string[];
}

const ServiceForm = ({ service, onClose }: Props) => {
  const router = useRouter();
  const { serviceSchema } = useLocalisedFormSchema();
  const [imageId, setImageId] = useState(service?.imageUrl || '');
  const [formData, setFormData] = useState<FormData>({
    name: service?.name || '',
    description_en: service?.description_en || '',
    description_fi: service?.description_fi || '',
    imageId: service?.imageUrl || '',
  });
  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = serviceSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    const sendRequest = async () => {
      const endpoint = service
        ? `/api/services/${service.id}/edit`
        : '/api/services';

      if (service) await axios.patch(endpoint, formData);
      else await axios.post(endpoint, formData);
    };

    try {
      setIsSubmitting(true);
      clearErrors();
      await sendRequest();
      handleSubmitSuccess();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearErrors = () => {
    setError('');
    setValidationErrors({});
  };

  const clearFormData = () => {
    setFormData({
      name: service?.name || '',
      description_en: service?.description_en || '',
      description_fi: service?.description_fi || '',
      imageId: service?.imageUrl || '',
    });
    setImageId(service?.imageUrl || '');
  };

  const handleSubmitSuccess = () => {
    clearFormData();
    onClose();
    router.refresh();
    toast.success(service ? 'Service edited' : 'Service created');
  };

  const handleCancel = () => {
    clearErrors();
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageSelect = (imageId: string) => {
    setImageId(imageId);
    setFormData((prevData) => ({ ...prevData, imageId }));
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <FormError>{error}</FormError>
      <FormGroup label='Name' error={validationErrors.name?.at(0)}>
        <Input
          id='name'
          value={formData.name || ''}
          type='text'
          placeholder='Name'
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup
        label='Description in English'
        error={validationErrors.description_en?.at(0)}
      >
        <Input
          id='description_en'
          value={formData.description_en || ''}
          type='text'
          placeholder='English description'
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup
        label='Description in Finnish'
        error={validationErrors.description_fi?.at(0)}
      >
        <Input
          id='description_fi'
          value={formData.description_fi || ''}
          type='text'
          placeholder='Finnish description'
          onChange={handleInputChange}
        />
      </FormGroup>
      <UploadImage onImageSelect={handleImageSelect} />
      <div className='relative h-[150px] w-full'>
        <CldImage
          src={imageId || 'fallback-image_mllokb'}
          alt='service image'
          fill
          priority
          className='h-auto object-contain'
        />
      </div>
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {service ? 'Edit' : 'Create'}
        </Button>
        <Button type='button' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
