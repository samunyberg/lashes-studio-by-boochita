import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import {
  ServiceOptionFormData,
  ServiceOptionFormValidationErrors,
} from '@/hooks/useServiceOptionForm';

interface Props {
  isEditing?: boolean;
  formData: ServiceOptionFormData;
  error: string;
  validationErrors: ServiceOptionFormValidationErrors;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}
const ServiceOptionForm = ({
  isEditing = false,
  formData,
  validationErrors,
  error,
  onInputChange,
  onPriceChange,
  onSubmit,
  isSubmitting,
  onCancel,
}: Props) => {
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <FormError>{error}</FormError>
      <FormGroup label='English name' error={validationErrors.name_en?.at(0)}>
        <Input
          id='name_en'
          value={formData.name_en}
          type='text'
          placeholder='English name'
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup label='Finnish name' error={validationErrors.name_fi?.at(0)}>
        <Input
          id='name_fi'
          value={formData.name_fi}
          type='text'
          placeholder='Finnish name'
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup label='Price' error={validationErrors.price?.at(0)}>
        <Input
          id='price'
          value={formData.price}
          type='number'
          step='0.01'
          placeholder='Price'
          onChange={onPriceChange}
        />
      </FormGroup>
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

export default ServiceOptionForm;
