import AppointmentHistory from '@/components/account/AppointmentHistory';
import Container from '@/components/common/Container';
import GoBackLink from '@/components/common/GoBackLink';
import StrikeThroughText from '@/components/common/StrikeThroughText';
import { getPassedAppointmentsByClientId } from '@/lib/db/appointments';

interface Props {
  params: { id: string };
}

const AppointmentHistoryPage = async ({ params: { id } }: Props) => {
  const passedAppointments = await getPassedAppointmentsByClientId(id);

  return (
    <Container>
      <StrikeThroughText className='my-6 w-full'>
        Varaushistoria
      </StrikeThroughText>
      <div className='my-5'>
        <GoBackLink />
      </div>
      <AppointmentHistory appointments={passedAppointments} />
    </Container>
  );
};

export default AppointmentHistoryPage;
