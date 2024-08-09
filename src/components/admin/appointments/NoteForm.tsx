import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import { FormData } from './AdminNote';

interface Props {
  isEditing: boolean;
  formData: FormData;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  error: string;
  validationError?: string;
  isSubmitting: boolean;
}

const NoteForm = ({
  isEditing,
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  error,
  validationError,
  isSubmitting,
}: Props) => {
  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <FormError>{error}</FormError>
      <FormGroup error={validationError}>
        <textarea
          id='adminNote'
          className='h-36 resize-none rounded-sm border border-black/20 p-2 font-medium shadow transition-all focus:outline-accent'
          value={formData.adminNote}
          placeholder='Write a note here...'
          onChange={onInputChange}
        />
      </FormGroup>
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {isEditing ? 'Edit' : 'Add'}
        </Button>
        <Button type='button' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
