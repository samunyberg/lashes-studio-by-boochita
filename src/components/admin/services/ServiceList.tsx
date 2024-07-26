'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { ServiceWithServiceOptions } from '@/lib/types';
import { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import NewServiceForm from './NewServiceForm';
import ServiceListItem from './ServiceListItem';

interface Props {
  services: ServiceWithServiceOptions[];
}

const ServiceList = ({ services }: Props) => {
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);

  const handleClose = () => setShowAddServiceForm(false);

  const serviceFormModal = (
    <Modal
      isVisible={showAddServiceForm}
      header={<h1 className='text-lg font-semibold'>Add Service</h1>}
      content={<NewServiceForm onClose={handleClose} />}
      onClose={handleClose}
    />
  );

  return (
    <div className='flex flex-col gap-4'>
      <Button onClick={() => setShowAddServiceForm(true)}>
        <span className='flex items-center gap-1'>
          <IoIosAddCircleOutline size={22} />
          <span>Add Service</span>
        </span>
      </Button>
      {services.length === 0 ? (
        <p className='p-2 font-medium'>No services.</p>
      ) : (
        <>
          {services.map((service) => (
            <ServiceListItem key={service.id} service={service} />
          ))}
        </>
      )}
      {serviceFormModal}
    </div>
  );
};

export default ServiceList;
