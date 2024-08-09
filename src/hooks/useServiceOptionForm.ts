import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { ServiceOption } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface ServiceOptionFormData {
  name_en: string;
  name_fi: string;
  description_en: string;
  description_fi: string;
  price: number;
}

export interface ServiceOptionFormValidationErrors {
  name_en?: string[];
  name_fi?: string[];
  description_en?: string[];
  description_fi?: string[];
  price?: string[];
}

export const useServiceOptionForm = (
  closeModal: () => void,
  serviceId: number,
  serviceOption?: ServiceOption
) => {
  const router = useRouter();
  const { serviceOptionSchema } = useLocalisedFormSchema();

  const initialFormData: ServiceOptionFormData = {
    name_en: serviceOption?.name_en || '',
    name_fi: serviceOption?.name_fi || '',
    description_en: serviceOption?.description_en || '',
    description_fi: serviceOption?.description_fi || '',
    price: serviceOption?.price || 0,
  };

  const [formData, setFormData] =
    useState<ServiceOptionFormData>(initialFormData);
  const [validationErrors, setValidationErrors] =
    useState<ServiceOptionFormValidationErrors>({});
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

      serviceOption
        ? await axios.patch(endpoint, formData)
        : await axios.post(endpoint, formData);
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

  const initializeFormData = () => {
    setFormData(initialFormData);
  };

  const handleCancel = () => {
    clearErrors();
    initializeFormData();
    closeModal();
  };

  const clearErrors = () => {
    setError('');
    setValidationErrors({});
  };

  const handleSubmitSuccess = () => {
    initializeFormData();
    toast.success(serviceOption ? 'Option edited' : 'Option created');
    closeModal();
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, price: value ? parseFloat(value) : 0 });
  };

  return {
    formData,
    error,
    validationErrors,
    isSubmitting,
    handleSubmit,
    handleCancel,
    handleInputChange,
    handlePriceChange,
  };
};
