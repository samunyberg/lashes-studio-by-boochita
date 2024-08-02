import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';

interface Props {
  appointmentId: number;
  initialNote?: string | null;
  onClose: () => void;
}

const NoteForm = ({ appointmentId, initialNote, onClose }: Props) => {
  const router = useRouter();
  const { adminNoteSchema } = useLocalisedFormSchema();
  const [note, setNote] = useState(initialNote || '');
  const [validationEror, setValidationError] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = adminNoteSchema.safeParse({ note });
    if (!validationResult.success) {
      setValidationError(
        validationResult.error.flatten().fieldErrors.note?.at(0)
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/appointments/${appointmentId}/update`, {
        adminNote: note,
      });
      onClose();
      toast.success(initialNote ? 'Note edited' : 'Note added');
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else setError('Whoops! Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setValidationError('');
    setError('');

    onClose();
  };

  return (
    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
      <FormError>{error}</FormError>
      <FormGroup error={validationEror}>
        <textarea
          className='h-36 resize-none rounded-sm border border-black/30 p-2 font-medium shadow transition-all focus:outline-accent'
          value={note}
          placeholder='Write a note here...'
          onChange={(e) => setNote(e.target.value)}
        />
      </FormGroup>
      <div className='mt-5 flex flex-col gap-4'>
        <Button type='submit' variant='accent' isLoading={isSubmitting}>
          {initialNote ? 'Edit' : 'Add'}
        </Button>
        <Button type='button' onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
