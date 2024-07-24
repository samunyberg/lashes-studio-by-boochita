import { Client } from '@/app/lib/types';
import { formatName } from '@/app/lib/utils';
import { IoPerson } from 'react-icons/io5';

interface Props {
  client: Client | null;
}

const ClientInfo = ({ client }: Props) => (
  <span className='flex items-center gap-2 text-sm'>
    <IoPerson size={12} />
    {formatName(client!)}
  </span>
);

export default ClientInfo;
