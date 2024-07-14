import { AppointmentWithAllData } from '@/app/lib/types';
import AppointmentList from '@/components/admin/AppointmentList';
import prisma from '@/prisma/client';

const AdminAppointmentsPage = async () => {
  const appointments = (await prisma.appointment.findMany({
    where: {
      dateTime: { gte: new Date() },
    },
    include: { service: true, serviceOption: true, client: true },
  })) as AppointmentWithAllData[];

  return (
    <div>
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default AdminAppointmentsPage;
