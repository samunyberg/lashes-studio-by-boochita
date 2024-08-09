import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import {
  ServiceFormData,
  ServiceFormValidationErrors,
} from '@/hooks/useServiceForm';
import { CldImage } from 'next-cloudinary';
import UploadImage from './UploadImage';

interface Props {
  isEditing?: boolean;
  formData: ServiceFormData;
  error: string;
  validationErrors: ServiceFormValidationErrors;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (imageId: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ServiceForm = ({
  isEditing = false,
  formData,
  validationErrors,
  error,
  onInputChange,
  onImageSelect,
  onSubmit,
  isSubmitting,
  onCancel,
}: Props) => {
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <FormError>{error}</FormError>
      <FormGroup label='Name' error={validationErrors?.name?.at(0)}>
        <Input
          id='name'
          value={formData.name}
          type='text'
          placeholder='Name'
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup
        label='Description in English'
        error={validationErrors?.description_en?.at(0)}
      >
        <Input
          id='description_en'
          value={formData.description_en}
          type='text'
          placeholder='English description'
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup
        label='Description in Finnish'
        error={validationErrors?.description_fi?.at(0)}
      >
        <Input
          id='description_fi'
          value={formData.description_fi}
          type='text'
          placeholder='Finnish description'
          onChange={onInputChange}
        />
      </FormGroup>
      <UploadImage onImageSelect={onImageSelect} />
      <div className='relative h-[150px] w-full'>
        <CldImage
          key={formData.imageId}
          src={formData.imageId || 'fallback-image_mllokb'}
          alt='service image'
          fill
          priority
          className='h-auto object-contain'
        />
      </div>
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {isEditing ? 'Edit' : 'Create'}
        </Button>
        <Button type='button' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
