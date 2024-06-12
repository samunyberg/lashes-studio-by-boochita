import { cn } from 'clsx-tailwind-merge';
import { FaRegCheckCircle } from 'react-icons/fa';

const steps = [
  {
    stepNumber: 1,
    label: 'Date and Time',
    description: 'Select appointment time',
  },
  {
    stepNumber: 2,
    label: 'Style',
    description: 'Select Style',
  },
  {
    stepNumber: 3,
    label: 'Info',
    description: 'Contact Information',
  },
  {
    stepNumber: 4,
    label: 'Confirm',
    description: 'Confirm Your Booking',
  },
];

interface Props {
  currentStep: number;
}

const BookingProgress = ({ currentStep }: Props) => {
  return (
    <div className='relative flex h-20 w-full flex-row justify-between bg-bgSoft p-2 shadow'>
      {steps.map((step) => (
        <div key={step.stepNumber}>
          <span
            className={cn(
              `flex items-center gap-1 px-1 text-sm text-primary text-opacity-60`,
              {
                'text-opacity-90': step.stepNumber <= currentStep,
                'font-semibold text-opacity-100':
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
  );
};

export default BookingProgress;
