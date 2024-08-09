'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useServiceForm } from '@/hooks/useServiceForm';
import { clipText } from '@/lib/utils/stringUtils';
import { Service } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import PaginatedTable from '../PaginatedTable';
import { Config } from '../Table';
import ServiceForm from './ServiceForm';

interface Props {
  services: Service[];
  itemsCount: number;
}

const config: Config<Service> = {
  columns: [
    {
      label: 'Name',
      render: (service) => (
        <Link
          className='underline active:text-accent lg:hover:text-accent'
          href={`/admin/services/${service.id}`}
        >
          {service.name}
        </Link>
      ),
    },
    {
      label: 'Description',
      render: (service) => <span>{clipText(service.description_en!, 20)}</span>,
    },
  ],
};

const keyFn = (service: Service) => service.id;

const ServiceTable = ({ services, itemsCount }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    formData,
    handleSubmit,
    handleCancel,
    handleInputChange,
    handleImageSelect,
    error,
    validationErrors,
    isSubmitting,
  } = useServiceForm(() => setModalVisible(false));

  const openServiceForm = () => {
    setModalVisible(true);
  };

  const closeServiceForm = () => {
    setModalVisible(false);
  };

  return (
    <div className='flex flex-col gap-5'>
      <Button
        variant='accent'
        className='my-3 lg:w-fit'
        onClick={openServiceForm}
      >
        Add Service
      </Button>
      <PaginatedTable
        data={services}
        config={config}
        keyFn={keyFn}
        itemsCount={itemsCount}
      />
      <Modal
        isVisible={modalVisible}
        header={<h1 className='text-lg font-semibold'>Add Service</h1>}
        onClose={closeServiceForm}
        content={
          <ServiceForm
            formData={formData}
            error={error}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
            onImageSelect={handleImageSelect}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
          />
        }
      />
    </div>
  );
};

export default ServiceTable;
