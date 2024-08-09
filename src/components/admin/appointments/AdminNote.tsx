import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useLocalisedFormSchema from '@/hooks/useLocalisedFormSchema';
import { Appointment } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import NoteForm from './NoteForm';

export interface FormData {
  adminNote: string;
}

interface Props {
  appointment: Appointment;
}

const AdminNote = ({ appointment }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { adminNoteSchema } = useLocalisedFormSchema();

  const initialFormData: FormData = {
    adminNote: appointment.adminNote || '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openNoteForm = () => {
    setModalVisible(true);
  };

  const closeNoteForm = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationResult = adminNoteSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationError(
        validationResult.error.flatten().fieldErrors.adminNote?.at(0) || ''
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.patch(`/api/appointments/${appointment.id}/update`, formData);
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
    setValidationError('');
    setError('');
    initializeFormData();
    closeNoteForm();
  };

  const clearErrors = () => {
    setValidationError('');
    setError('');
  };

  const handleSubmitSuccess = () => {
    clearErrors();
    initializeFormData();
    closeNoteForm();
    toast.success(appointment.adminNote ? 'Note edited' : 'Note added');
    router.refresh();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, adminNote: event.target.value });
  };

  return (
    <div>
      <Button onClick={openNoteForm}>
        <span className='flex items-center gap-2'>
          <FaEdit size={22} className='cursor-pointer' />
          <p>{appointment.adminNote ? 'Edit Note' : 'Add Note'}</p>
        </span>
      </Button>
      <Modal
        isVisible={modalVisible}
        header={
          <h1 className='text-lg font-semibold'>
            {appointment.adminNote ? 'Edit Note' : 'Add Note'}
          </h1>
        }
        content={
          <NoteForm
            isEditing={!!appointment.adminNote}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            error={error}
            validationError={validationError}
            isSubmitting={isSubmitting}
          />
        }
        onClose={closeNoteForm}
      />
    </div>
  );
};

export default AdminNote;
