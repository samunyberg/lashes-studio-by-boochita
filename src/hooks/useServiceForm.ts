import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Service } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface ServiceFormData {
  name: string;
  description_en: string;
  description_fi: string;
  imageId: string;
}

export interface ServiceFormValidationErrors {
  name?: string[];
  description_en?: string[];
  description_fi?: string[];
}

export const useServiceForm = (closeModal: () => void, service?: Service) => {
  const router = useRouter();
  const { serviceSchema } = useLocalisedFormSchema();

  const initialData: ServiceFormData = {
    name: service?.name || '',
    description_en: service?.description_en || '',
    description_fi: service?.description_fi || '',
    imageId: service?.imageUrl || '',
  };

  const [formData, setFormData] = useState<ServiceFormData>(initialData);
  const [validationErrors, setValidationErrors] =
    useState<ServiceFormValidationErrors>({});
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
        ? `/api/services/${service.id}`
        : '/api/services';

      service
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
    setFormData(initialData);
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
    toast.success(service ? 'Service edited' : 'Service created');
    closeModal();
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleImageSelect = (imageId: string) => {
    setFormData((prevData) => ({ ...prevData, imageId }));
  };

  return {
    formData,
    error,
    validationErrors,
    isSubmitting,
    handleSubmit,
    handleCancel,
    handleInputChange,
    handleImageSelect,
  };
};
