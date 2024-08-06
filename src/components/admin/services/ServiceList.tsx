'use client';

import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import Modal from '@/components/common/Modal';
import { ServiceWithServiceOptions } from '@/lib/types';
import { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ServiceForm from './ServiceForm';
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
      content={<ServiceForm onClose={handleClose} />}
      onClose={handleClose}
    />
  );

  return (
    <Container className='flex flex-col gap-5 pb-8'>
      <h1 className='text-xl font-semibold'>Services</h1>
      <Button className='lg:w-fit' onClick={() => setShowAddServiceForm(true)}>
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
    </Container>
  );
};

export default ServiceList;
