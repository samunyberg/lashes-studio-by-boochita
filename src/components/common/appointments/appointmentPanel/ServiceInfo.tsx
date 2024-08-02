import { Service, ServiceOption } from '@prisma/client';
import { FaCheck } from 'react-icons/fa';

interface Props {
  service: Service | null;
  serviceOption: ServiceOption | null;
}

const ServiceInfo = ({ service, serviceOption }: Props) => (
  <span className='flex items-center gap-2'>
    <FaCheck size={12} />
    {service?.name}, {serviceOption?.name}
  </span>
);

export default ServiceInfo;
