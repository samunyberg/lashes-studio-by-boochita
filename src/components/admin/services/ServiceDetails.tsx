'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Panel from '@/components/common/Panel';
import { ServiceWithServiceOptions } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import DeleteButton from '../DeleteButton';
import DetailsPage from '../DetailsPage';
import ServiceForm from './ServiceForm';
import ServiceOptionForm from './ServiceOptionForm';
import ServiceOptionTable from './ServiceOptionTable';

interface Props {
  service: ServiceWithServiceOptions;
}

const ServiceDetails = ({ service }: Props) => {
  const [showEditServiceForm, setShowEditServiceForm] = useState(false);
  const [showServiceOptionForm, setShowServiceOptionForm] = useState(false);

  const editServiceFormModal = (
    <Modal
      isVisible={showEditServiceForm}
      header={<h1 className='text-lg font-semibold'>Edit Service</h1>}
      content={
        <ServiceForm
          service={service}
          onClose={() => setShowEditServiceForm(false)}
        />
      }
      onClose={() => setShowEditServiceForm(false)}
    />
  );

  const serviceOptionFormModal = (
    <Modal
      isVisible={showServiceOptionForm}
      header={<h1 className='text-lg font-semibold'>Create New Option</h1>}
      content={
        <ServiceOptionForm
          serviceId={service.id}
          onClose={() => setShowServiceOptionForm(false)}
        />
      }
      onClose={() => setShowServiceOptionForm(false)}
    />
  );

  return (
    <DetailsPage
      heading={
        <div className='flex items-center justify-between'>
          <h1>Service Details</h1>
          <Button
            variant='accent'
            className='!h-fit !min-w-fit !px-3 !text-sm'
            onClick={() => setShowEditServiceForm(true)}
          >
            Edit
          </Button>
        </div>
      }
    >
      <Panel className='overflow-hidden'>
        <div className='relative h-[300px] w-full'>
          <CldImage
            key={service.imageUrl}
            src={service.imageUrl || 'fallback-image_mllokb'}
            alt='service image'
            fill
            priority
            className='h-auto object-cover'
          />
          <span className='absolute left-2 top-2 rounded-sm bg-bgSofter p-4 text-xl'>
            {service.name}
          </span>
        </div>
        <div className='p-4'>
          <p className='text-[15px] font-medium'>{service.description_en}</p>
          <hr className='my-1 w-full border-black/20' />
          <p className='text-[15px] font-medium'>{service.description_fi}</p>
        </div>
      </Panel>
      <hr className='my-5 w-full border-black/20' />
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Service options</h2>
          <Button
            variant='accent'
            className='!h-fit !min-w-fit !px-3 !text-sm'
            onClick={() => setShowServiceOptionForm(true)}
          >
            New
          </Button>
        </div>
        <ServiceOptionTable options={service.serviceOptions} />
        <hr className='my-3 w-full border-black/20' />
        <DeleteButton
          endpoint={`/api/services/${service.id}`}
          callbackUrl={`/admin/services`}
        />
      </div>
      {editServiceFormModal}
      {serviceOptionFormModal}
    </DetailsPage>
  );
};

export default ServiceDetails;
