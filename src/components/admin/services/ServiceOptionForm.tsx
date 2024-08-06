import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { ServiceOption } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  serviceId?: number;
  serviceOption?: ServiceOption;
  onClose: () => void;
}

interface FieldErrors {
  name_en?: string[];
  name_fi?: string[];
  description_en?: string[];
  description_fi?: string[];
  price?: string[];
}

interface FormData {
  name_en: string;
  name_fi: string;
  description_en: string;
  description_fi: string;
  price: number | undefined;
}

const ServiceOptionForm = ({ serviceOption, serviceId, onClose }: Props) => {
  const router = useRouter();
  const { serviceOptionSchema } = useLocalisedFormSchema();
  const [formData, setFormData] = useState<FormData>({
    name_en: serviceOption?.name_en || '',
    name_fi: serviceOption?.name_fi || '',
    description_en: serviceOption?.name_en || '',
    description_fi: serviceOption?.name_fi || '',
    price: serviceOption?.price || 0.0,
  });
  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = serviceOptionSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error.flatten().fieldErrors);
      return;
    }

    const sendRequest = async () => {
      const endpoint = serviceOption
        ? `/api/services/${serviceOption.serviceId}/service-options/${serviceOption.id}`
        : `/api/services/${serviceId}/service-options`;

      if (serviceOption) await axios.patch(endpoint, formData);
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
      name_en: serviceOption?.name_en || '',
      name_fi: serviceOption?.name_fi || '',
      description_en: serviceOption?.name_en || '',
      description_fi: serviceOption?.name_fi || '',
      price: serviceOption?.price || 0.0,
    });
  };

  const handleSubmitSuccess = () => {
    clearFormData();
    onClose();
    router.refresh();
    toast.success(serviceOption ? 'Option edited' : 'Option created');
  };

  const handleCancel = () => {
    clearErrors();
    onClose();
  };

  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      <FormError>{error}</FormError>
      <FormGroup label='English name' error={validationErrors.name_en?.at(0)}>
        <Input
          id='name_en'
          value={formData.name_en}
          type='text'
          placeholder='English name'
          onChange={(event) =>
            setFormData({ ...formData, name_en: event.target.value })
          }
        />
      </FormGroup>
      <FormGroup label='Finnish name' error={validationErrors.name_fi?.at(0)}>
        <Input
          id='name_fi'
          value={formData.name_fi}
          type='text'
          placeholder='Finnish name'
          onChange={(event) =>
            setFormData({ ...formData, name_fi: event.target.value })
          }
        />
      </FormGroup>
      <FormGroup
        label='English description'
        error={validationErrors.description_en?.at(0)}
      >
        <Input
          id='description_en'
          value={formData.description_en}
          type='text'
          placeholder='English description'
          onChange={(event) =>
            setFormData({ ...formData, description_en: event.target.value })
          }
        />
      </FormGroup>
      <FormGroup
        label='Finnish description'
        error={validationErrors.description_fi?.at(0)}
      >
        <Input
          id='description_fi'
          value={formData.description_fi}
          type='text'
          placeholder='Finnish description'
          onChange={(event) =>
            setFormData({ ...formData, description_fi: event.target.value })
          }
        />
      </FormGroup>
      <FormGroup label='Price' error={validationErrors.price?.at(0)}>
        <Input
          id='price'
          value={formData.price}
          type='number'
          step='0.01'
          placeholder='Price'
          onChange={(event) =>
            setFormData({ ...formData, price: parseFloat(event.target.value) })
          }
        />
      </FormGroup>
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {serviceOption ? 'Edit' : 'Create'}
        </Button>
        <Button type='button' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ServiceOptionForm;
