import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { useServiceOptionForm } from '@/hooks/useServiceOptionForm';
import { ServiceOption } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import Table, { Config } from '../Table';
import ServiceOptionForm from './ServiceOptionForm';

const config: Config<ServiceOption> = {
  columns: [
    {
      label: 'Name',
      render: (option) => (
        <Link
          className='underline transition-all active:text-accent lg:hover:text-accent'
          href={`/admin/services/${option.serviceId}/service-options/${option.id}`}
        >
          {option.name_en}
        </Link>
      ),
    },
    {
      label: 'Price',
      render: (option) => option.price + '€',
    },
  ],
};

const keyFn = (option: ServiceOption) => option.id;

interface Props {
  serviceId: number;
  options: ServiceOption[];
}

const ServiceOptions = ({ serviceId, options }: Props) => {
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
  } = useServiceOptionForm(() => setModalVisible(false), serviceId);

  const openServiceOptionForm = () => {
    setModalVisible(true);
  };

  const closeServiceOptionForm = () => {
    setModalVisible(false);
  };

  if (options.length === 0)
    return (
      <div className='text-sm font-medium'>
        Click New Service Option to add an option for this service.
      </div>
    );

  return (
    <div>
      <h2 className='mb-2 text-lg font-semibold'>Service options</h2>
      <Table data={options} config={config} keyFn={keyFn} />
      <Button className='mt-5 w-full lg:w-fit' onClick={openServiceOptionForm}>
        Add
      </Button>
      <Modal
        isVisible={modalVisible}
        onClose={closeServiceOptionForm}
        header={<h1 className='text-lg font-semibold'>Add New Option</h1>}
        content={
          <ServiceOptionForm
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
      />
    </div>
  );
};

export default ServiceOptions;
