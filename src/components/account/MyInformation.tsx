'use client';

import { UserWithAppointments } from '@/app/lib/types';
import { useState } from 'react';
import ChangePasswordForm from '../auth/ChangePasswordForm';
import Button from '../common/Button';
import Label from '../common/Label';
import Modal from '../common/Modal';
import Panel from '../common/Panel';
import EditInformationForm from './EditInformationForm';

interface Props {
  user: UserWithAppointments;
}

const MyInformation = ({ user }: Props) => {
  const [showEditInformationForm, setShowEditInformationForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const handleCloseEditInformationForm = () =>
    setShowEditInformationForm(false);

  const handleClosePasswordForm = () => setShowChangePasswordForm(false);

  return (
    <div>
      <h2 className='mb-2 text-lg font-semibold'>
        <Label labelId='my_information' />
      </h2>
      <Panel className='relative mb-5 flex flex-col gap-4 p-4 '>
        <div className='flex flex-col gap-1'>
          <p className='font-semibold'>
            <Label labelId='first_name' />
          </p>
          <hr className='border-accent' />
          <span className='pl-2'>{user.firstName}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='last_name' />
          </p>
          <hr className='border-accent' />
          <span className='pl-2'>{user.lastName}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='email' />
          </p>
          <hr className='border-accent' />
          <span className='pl-2'>{user.email}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='font-semibold'>
            <Label labelId='phone' />
          </p>
          <hr className='border-accent' />
          <span className='pl-2'>{user.phone}</span>
        </div>
      </Panel>
      <Button
        variant='primary'
        className='w-full lg:w-fit'
        onClick={() => setShowEditInformationForm(true)}
      >
        <Label labelId='edit' />
      </Button>
      <Button
        variant='accent'
        className='mt-5 w-full lg:w-fit'
        onClick={() => setShowChangePasswordForm(true)}
      >
        <Label labelId='change_password' />
      </Button>
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
        content={
          <ChangePasswordForm
            userId={user.id}
            onClose={handleClosePasswordForm}
          />
        }
        onClose={handleClosePasswordForm}
      />
    </div>
  );
};

export default MyInformation;
