import { Step } from '@/app/lib/types';
import BookingTime from './BookingTime';
import ProgressSteps from './ProgressSteps';

interface Props {
  steps: Step[];
  currentStep: number;
}

const BookingHeader = ({ currentStep, steps }: Props) => {
  return (
    <div className='rounded-sm bg-bgSoft p-2 shadow'>
      <BookingTime />
      <ProgressSteps currentStep={currentStep} steps={steps} />
    </div>
  );
};

export default BookingHeader;
