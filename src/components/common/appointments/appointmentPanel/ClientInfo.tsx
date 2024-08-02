import { Client } from '@/lib/types';
import { formatName } from '@/lib/utils/stringUtils';
import { IoPerson } from 'react-icons/io5';

interface Props {
  client: Client | null;
}

const ClientInfo = ({ client }: Props) => (
  <span className='flex items-center gap-2'>
    <IoPerson size={12} />
    {formatName(client!)}
  </span>
);

export default ClientInfo;
