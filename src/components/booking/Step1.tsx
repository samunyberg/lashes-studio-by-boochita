import { Appointment } from '@prisma/client';
import Calendar from '../calendar/Calendar';

interface Props {
  appointments: Appointment[];
}

const Step1 = ({ appointments }: Props) => {
  return <Calendar appointments={appointments} />;
};

export default Step1;
