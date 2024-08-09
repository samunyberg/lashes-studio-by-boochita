import Button from '@/components/common/Button';
import FormError from '@/components/common/forms/FormError';
import FormGroup from '@/components/common/forms/FormGroup';
import Input from '@/components/common/forms/Input';
import Modal from '@/components/common/Modal';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

interface Props {
  endpoint: string;
  callbackUrl: string;
}

const DeleteButton = ({ endpoint, callbackUrl }: Props) => {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  const textsMatch = () => text === 'Delete';

  const handleClose = () => {
    setShowConfirmation(false);
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await axios.delete(endpoint);
      router.push(callbackUrl);
      router.refresh();
      toast.success('Deletion successful');
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
        className='!bg-red-400 !text-white lg:w-fit'
        onClick={() => setShowConfirmation(true)}
      >
        Delete
      </Button>
      <Modal
        isVisible={showConfirmation}
        header={<h1 className='text-lg font-semibold'>Delete</h1>}
        content={
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-4 rounded-sm border-2 border-red-400 px-4 py-3'>
              <div className='flex items-center gap-1'>
                <RiErrorWarningLine size={25} />
                <p className='text-lg font-semibold'>Warning!</p>
              </div>
              <p className='font-medium'>Are you sure?</p>
            </div>
            <FormGroup label={`Type "Delete" to confirm.`}>
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

export default DeleteButton;
