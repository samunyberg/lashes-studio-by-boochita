import { ServiceOption } from '@prisma/client';
import Link from 'next/link';
import Table, { Config } from '../Table';

interface Props {
  options: ServiceOption[];
}

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

const ServiceOptionTable = ({ options }: Props) => {
  if (options.length === 0)
    return (
      <div className='text-sm font-medium'>
        Click New Service Option to add an option for this service.
      </div>
    );

  return <Table data={options} config={config} keyFn={keyFn} />;
};

export default ServiceOptionTable;
