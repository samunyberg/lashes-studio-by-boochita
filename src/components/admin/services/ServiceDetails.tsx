import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import Panel from '@/components/common/Panel';
import Spacer from '@/components/common/Spacer';
import { useServiceForm } from '@/hooks/useServiceForm';
import { Service } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import DeleteButton from '../DeleteButton';
import ServiceForm from './ServiceForm';

interface Props {
  service: Service;
}

const ServiceDetails = ({ service }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    error,
    formData,
    handleImageSelect,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    validationErrors,
  } = useServiceForm(() => setModalVisible(false), service);

  const openEditServiceForm = () => {
    setModalVisible(true);
  };

  const closeEditServiceForm = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Panel className='overflow-hidden'>
        <div className='relative h-[300px] w-full'>
          <CldImage
            key={service.imageUrl}
            src={service.imageUrl || 'fallback-image_mllokb'}
            alt='service image'
            priority
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1400px) 50vw'
            className='h-auto object-cover'
          />
          <span className='absolute left-2 top-2 rounded-sm bg-bgSofter p-4 text-xl'>
            {service.name}
          </span>
        </div>
        <div className='p-4'>
          <p className='text-[15px] font-medium'>{service.description_en}</p>
          <Spacer className='my-2' />
          <p className='text-[15px] font-medium'>{service.description_fi}</p>
        </div>
      </Panel>
      <div className='mt-5 flex flex-col gap-5 lg:flex-row'>
        <Button onClick={openEditServiceForm}>Edit</Button>
        <DeleteButton
          endpoint={`/api/services/${service.id}`}
          callbackUrl={`/admin/services`}
        />
      </div>
      <Modal
        isVisible={modalVisible}
        onClose={closeEditServiceForm}
        header={<h1 className='text-lg font-semibold'>Edit Service</h1>}
        content={
          <ServiceForm
            isEditing
            formData={formData}
            error={error}
            validationErrors={validationErrors}
            onInputChange={handleInputChange}
            onImageSelect={handleImageSelect}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={closeEditServiceForm}
          />
        }
      />
    </div>
  );
};

export default ServiceDetails;
