import { getPassedAppointmentsByClientId } from '@/lib/db/appointments';
import AppointmentHistory from '@/components/account/AppointmentHistory';
import StrikeThroughText from '@/components/common/StrikeThroughText';

interface Props {
  params: { id: string };
}

const AppointmentHistoryPage = async ({ params: { id } }: Props) => {
  const passedAppointments = await getPassedAppointmentsByClientId(id);

  return (
    <>
      <StrikeThroughText className='my-6 w-full'>
        Varaushistoria
      </StrikeThroughText>
      <AppointmentHistory appointments={passedAppointments} />
    </>
  );
};

export default AppointmentHistoryPage;
