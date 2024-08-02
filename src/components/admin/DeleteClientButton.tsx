import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import Modal from '../common/Modal';
import FormError from '../common/forms/FormError';
import FormGroup from '../common/forms/FormGroup';
import Input from '../common/forms/Input';

interface Props {
  clientId: string;
  clientName: string;
}

const DeleteClientButton = ({ clientId, clientName }: Props) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const textsMatch = () => clientName === text;

  const handleClose = () => {
    setText('');
    setShowConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      setError('');
      setIsSubmitting(true);
      await axios.delete(`/api/users/${clientId}/delete`);
      router.push('/admin/clients');
      router.refresh();
      toast.success('Client deleted successfully');
    } catch (error: unknown) {
      if (error instanceof AxiosError) setError(error.response?.data.error);
      else {
        setError('Whoops! Something went wrong.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        className='!bg-red-400 !text-white'
        onClick={() => setShowConfirmation(true)}
      >
        Delete Client
      </Button>
      <Modal
        isVisible={showConfirmation}
        header={<h1 className='text-lg font-semibold'>Delete Client</h1>}
        content={
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-4 rounded-sm border-2 border-red-400 px-4 py-5'>
              <div className='flex items-center gap-1'>
                <RiErrorWarningLine size={25} />
                <p className='text-lg font-semibold'>Warning!</p>
              </div>
              <p className='font-medium'>
                This action cannot be undone. Deleting a client will make you
                lose access to client&apos; past appointments.
              </p>
            </div>
            <FormGroup label={`Type "${clientName}" to confirm.`}>
              <Input
                id='name'
                type='text'
                placeholder='Type here...'
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </FormGroup>
            <FormError>{error}</FormError>
            <div className='mt-5 flex flex-col gap-4'>
              <Button
                variant='accent'
                onClick={handleDelete}
                disabled={!textsMatch()}
                isLoading={isSubmitting}
              >
                Delete
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </div>
          </div>
        }
        onClose={handleClose}
      />
    </>
  );
};

export default DeleteClientButton;
