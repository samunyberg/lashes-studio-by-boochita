import ClientList from '@/components/admin/ClientList';
import prisma from '@/prisma/client';

const AdminClientsPage = async () => {
  const clients = await prisma.user.findMany();

  return <ClientList clients={clients} />;
};

export const dynamic = 'force-dynamic';

export default AdminClientsPage;
