'use client';

import { ClientWithAppointments } from '@/lib/types';
import { useState } from 'react';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import Button from '../common/Button';
import Label from '../common/Label';
import Modal from '../common/Modal';
import Panel from '../common/Panel';
import EditInformationForm from './EditInformationForm';

interface Props {
  user: ClientWithAppointments;
}

const MyInformation = ({ user }: Props) => {
  const [showEditInformationForm, setShowEditInformationForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleCloseEditInformationForm = () =>
    setShowEditInformationForm(false);

  const handleClosePasswordForm = () => setShowChangePasswordForm(false);

  return (
    <div>
      <h2 className='mb-5 text-xl font-semibold'>
        <Label labelId='my_information' />
      </h2>
      <Panel className='relative mb-5 flex flex-col gap-4 p-4 '>
        <div className='flex flex-col gap-1'>
          <p className='font-semibold'>
            <Label labelId='first_name' />
          </p>
          <hr className='border-black/20' />
          <span className='pl-2'>{user.firstName}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='last_name' />
          </p>
          <hr className='border-black/20' />
          <span className='pl-2'>{user.lastName}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='email' />
          </p>
          <hr className='border-black/20' />
          <span className='pl-2'>{user.email}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='phone' />
          </p>
          <hr className='border-black/20' />
          <span className='pl-2'>{user.phone}</span>
        </div>
      </Panel>
      <div className='flex flex-col gap-4 md:flex-row'>
        <Button
          variant='primary'
          className='w-full lg:w-fit'
          onClick={() => setShowEditInformationForm(true)}
        >
          <Label labelId='edit' />
        </Button>
        <Button
          variant='accent'
          className='w-full lg:w-fit'
          onClick={() => setShowChangePasswordForm(true)}
        >
          <Label labelId='change_password' />
        </Button>
      </div>
      <Modal
        isVisible={showEditInformationForm}
        header={
          <span className='text-lg font-medium'>
            <Label labelId='edit' />
          </span>
        }
        content={
          <EditInformationForm
            user={user}
            onClose={handleCloseEditInformationForm}
          />
        }
        onClose={handleCloseEditInformationForm}
      />
      <Modal
        isVisible={showChangePasswordForm}
        header={
          <span className='text-lg font-medium'>
            <Label labelId='change_password' />
          </span>
        }
        content={<ChangePasswordForm onClose={handleClosePasswordForm} />}
        onClose={handleClosePasswordForm}
      />
    </div>
  );
};

export default MyInformation;
