import ClientDetails from '@/components/admin/ClientDetails';
import { getClientWithUpcomingAppointments } from '@/lib/db/clients';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const ClientDetailsPage = async ({ params: { id } }: Props) => {
  const client = await getClientWithUpcomingAppointments(id);

  if (!client) notFound();

  return <ClientDetails client={client} />;
};

export const dynamic = 'force-dynamic';

export default ClientDetailsPage;
