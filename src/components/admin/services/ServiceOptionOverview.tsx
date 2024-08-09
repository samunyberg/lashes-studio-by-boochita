'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import { useServiceOptionForm } from '@/hooks/useServiceOptionForm';
import { ServiceOption } from '@prisma/client';
import { useState } from 'react';
import DeleteButton from '../DeleteButton';
import ManagementPage from '../ManagementPage';
import ServiceOptionForm from './ServiceOptionForm';

interface Props {
  serviceOption: ServiceOption;
  associatedServiceName: string;
}

const ServiceOptionOverview = ({
  serviceOption,
  associatedServiceName,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    error,
    formData,
    handleInputChange,
    handlePriceChange,
    handleSubmit,
    handleCancel,
    isSubmitting,
    validationErrors,
  } = useServiceOptionForm(
    () => setModalVisible(false),
    serviceOption.serviceId,
    serviceOption
  );

  const openServiceOptionForm = () => {
    setModalVisible(true);
  };

  const closeServiceOptionForm = () => {
    setModalVisible(false);
  };

  return (
    <ManagementPage heading={'Manage Service Option'}>
      <p className='font-medium'>
        This option is for{' '}
        <span className='font-semibold'>{associatedServiceName}</span>
      </p>
      <Panel className='flex flex-col gap-2 p-3'>
        <p className='text-sm underline'>English name:</p>
        <p>{serviceOption.name_en}</p>
        <p className='text-sm underline'>Finnish name:</p>
        <p>{serviceOption.name_fi}</p>
        <Spacer className='my-2' />
        <p className='text-sm underline'>English description:</p>
        <p>{serviceOption.description_en}</p>
        <p className='text-sm underline'>Finnish description:</p>
        <p>{serviceOption.description_fi}</p>
        <Spacer className='my-2' />
        <p className='text-sm underline'>Price:</p>
        <p>{serviceOption.price + '€'}</p>
      </Panel>
      <Spacer />
      <div className='flex flex-col gap-5 lg:flex-row'>
        <Button className='lg:w-fit' onClick={openServiceOptionForm}>
          Edit
        </Button>
        <DeleteButton
          endpoint={`/api/services/${serviceOption.serviceId}/service-options/${serviceOption.id}`}
          callbackUrl={`/admin/services/${serviceOption.serviceId}`}
        />
      </div>
      <Modal
        isVisible={modalVisible}
        header={<h1 className='text-lg font-semibold'>Edit Option</h1>}
        content={
          <ServiceOptionForm
            isEditing
            formData={formData}
            error={error}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
            onPriceChange={handlePriceChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
          />
        }
        onClose={closeServiceOptionForm}
      />
    </ManagementPage>
  );
};

export default ServiceOptionOverview;
