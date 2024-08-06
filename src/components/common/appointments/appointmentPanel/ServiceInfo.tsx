import { FaCheck } from 'react-icons/fa';

interface Props {
  serviceName: string;
  serviceOptionName: string;
}

const ServiceInfo = ({ serviceName, serviceOptionName }: Props) => (
  <span className='flex items-center gap-2'>
    <FaCheck size={12} />
    {serviceName}, {serviceOptionName}
  </span>
);

export default ServiceInfo;
