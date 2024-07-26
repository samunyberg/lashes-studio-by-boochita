import { ServiceOption } from '@prisma/client';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import Table, { Config } from '../Table';

interface Props {
  options: ServiceOption[];
}

const sliceText = (text: string, maxLength: number) => {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};

const config: Config<ServiceOption> = {
  showHeaderRow: false,
  columns: [
    {
      label: 'Name',
      render: (option) => (
        <Link
          href={'/admin/clients/' + option.id}
          className='underline active:text-accent lg:hover:text-accent'
        >
          {option.name}
        </Link>
      ),
    },
    {
      label: 'Desc',
      render: (option) => sliceText(option.description!, 20),
    },
    {
      label: 'Price',
      render: (option) => option.price + '€',
    },
    {
      label: '',
      render: () => <FaRegEdit size={20} />,
    },
  ],
};

const keyFn = (option: ServiceOption) => option.id;

const ServiceOptionTable = ({ options }: Props) => {
  return <Table data={options} config={config} keyFn={keyFn} />;
};

export default ServiceOptionTable;
