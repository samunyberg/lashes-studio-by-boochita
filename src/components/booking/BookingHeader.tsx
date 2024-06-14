import { cn } from 'clsx-tailwind-merge';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Step } from './BookingForm';
import BookingTime from './BookingTime';

interface Props {
  steps: Step[];
  currentStep: number;
}

const BookingHeader = ({ steps, currentStep }: Props) => {
  return (
    <div className='bg-bgSoft shadow'>
      <BookingTime />
      <div className='relative flex h-20 w-full flex-row justify-between p-2'>
        {steps.map((step) => (
          <div key={step.stepNumber}>
            <span
              className={cn(
                `flex items-center gap-1 px-1 text-sm text-opacity-60`,
                {
                  'text-opacity-90': step.stepNumber <= currentStep,
                  'font-bold text-opacity-100 underline':
                    step.stepNumber === currentStep,
                }
              )}
            >
              {step.label}
              {step.stepNumber < currentStep && <FaRegCheckCircle />}
            </span>
            {step.stepNumber === currentStep && (
              <div className='absolute bottom-0 left-0 w-full p-4 tracking-wide'>
                {step.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHeader;
