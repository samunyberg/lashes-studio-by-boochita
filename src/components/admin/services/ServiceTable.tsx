'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
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
  const [showServiceForm, setShowServiceForm] = useState(false);

  const serviceFormModal = (
    <Modal
      isVisible={showServiceForm}
      header={<h1 className='text-lg font-semibold'>Create New Service</h1>}
      content={<ServiceForm onClose={() => setShowServiceForm(false)} />}
      onClose={() => setShowServiceForm(false)}
    />
  );

  return (
    <>
      <Button
        variant='accent'
        className='mb-5 !h-fit !w-fit !px-3 !text-sm'
        onClick={() => setShowServiceForm(true)}
      >
        New
      </Button>
      <PaginatedTable
        data={services}
        config={config}
        keyFn={keyFn}
        itemsCount={itemsCount}
      />
      {serviceFormModal}
    </>
  );
};

export default ServiceTable;
