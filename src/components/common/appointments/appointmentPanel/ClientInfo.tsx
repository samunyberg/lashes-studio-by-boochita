import { IoPerson } from 'react-icons/io5';

interface Props {
  clientName: string;
}

const ClientInfo = ({ clientName }: Props) => (
  <span className='flex items-center gap-2'>
    <IoPerson size={12} />
    {clientName}
  </span>
);

export default ClientInfo;
