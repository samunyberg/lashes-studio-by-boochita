import Panel from '@/components/common/Panel';
import { ServiceWithServiceOptions } from '@/lib/types';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ServiceOptionTable from './ServiceOptionTable';

interface Props {
  service: ServiceWithServiceOptions;
}

const ServiceListItem = ({ service }: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Panel className='flex flex-col gap-3 p-2'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-lg font-semibold'>{service.name}</h2>
          <p className='text-sm font-medium'>{service.description}</p>
        </div>
        <CldImage
          src={service.imageUrl || 'fallback-image_xp2itd'}
          className='rounded-sm object-cover shadow'
          alt='Service image'
          height={90}
          width={90}
        />
      </div>
      <div>
        <div
          className='flex items-center justify-between pr-2'
          onClick={() => setShowOptions(!showOptions)}
        >
          <span className='flex items-center gap-2'>
            <h3 className='font-semibold'>Service options</h3>
            {showOptions ? (
              <FaChevronUp size={15} />
            ) : (
              <FaChevronDown size={15} />
            )}
          </span>
          {showOptions && <IoIosAddCircleOutline size={22} />}
        </div>
        {showOptions && <ServiceOptionTable options={service.serviceOptions} />}
      </div>
    </Panel>
  );
};

export default ServiceListItem;
