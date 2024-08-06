'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Panel from '@/components/common/Panel';
import { ServiceOption } from '@prisma/client';
import { useState } from 'react';
import DeleteButton from '../DeleteButton';
import DetailsPage from '../DetailsPage';
import ServiceOptionForm from './ServiceOptionForm';

interface Props {
  serviceOption: ServiceOption;
}

const ServiceOptionDetails = ({ serviceOption }: Props) => {
  const [showServiceOptionForm, setShowServiceOptionForm] = useState(false);

  const serviceOptionFormModal = (
    <Modal
      isVisible={showServiceOptionForm}
      header={<h1 className='text-lg font-semibold'>Edit Option</h1>}
      content={
        <ServiceOptionForm
          serviceOption={serviceOption}
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
          <h1>Service Option Details</h1>
          <Button
            variant='accent'
            className='!h-fit !min-w-fit !px-3 !text-sm'
            onClick={() => setShowServiceOptionForm(true)}
          >
            Edit
          </Button>
        </div>
      }
    >
      <Panel className='flex flex-col gap-2 overflow-hidden p-2'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>English name:</p>
          <p>{serviceOption.name_en}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Finnish name:</p>
          <p>{serviceOption.name_fi}</p>
        </div>
        <hr className='my-1 w-full border-black/20' />
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>English description:</p>
          <p>{serviceOption.description_en}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Finnish description:</p>
          <p>{serviceOption.description_fi}</p>
        </div>
        <hr className='my-1 w-full border-black/20' />
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>Price:</p>
          <p>{serviceOption.price + '€'}</p>
        </div>
      </Panel>
      <hr className='my-3 w-full border-black/20' />
      <DeleteButton
        endpoint={`/api/services/${serviceOption.serviceId}/service-options/${serviceOption.id}`}
        callbackUrl={`/admin/services/${serviceOption.serviceId}`}
      />
      {serviceOptionFormModal}
    </DetailsPage>
  );
};

export default ServiceOptionDetails;
