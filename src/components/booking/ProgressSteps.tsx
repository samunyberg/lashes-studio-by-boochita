import { Step } from '@/app/lib/types';
import { cn } from 'clsx-tailwind-merge';
import { FaCheck } from 'react-icons/fa';
import Label from '../common/Label';

interface Props {
  currentStep: number;
  steps: Step[];
}

const ProgressSteps = ({ currentStep, steps }: Props) => {
  const calculateWidth = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100 + '%';
  };

  return (
    <>
      <div className='mx-auto flex h-14 w-[90%] justify-center'>
        <div className='relative flex w-full items-center justify-between'>
          <div className='absolute z-0 h-1 w-full bg-black bg-opacity-15' />
          <div
            className='absolute z-0 h-1 bg-accent transition-all duration-300 ease-in'
            style={{ width: calculateWidth() }}
          />
          {steps.map((step) => (
            <span
              key={step.stepNumber}
              className={cn(
                'z-10 flex size-7 items-center justify-center rounded-full border-2 border-accent bg-white transition-all delay-300 duration-300 ease-in',
                {
                  'size-8 border-primary bg-accent text-white':
                    step.stepNumber === currentStep,
                }
              )}
            >
              {step.stepNumber < currentStep ? (
                <FaCheck size={12} className='text-primary' />
              ) : (
                step.stepNumber
              )}
            </span>
          ))}
        </div>
      </div>
      <div className='ml-4 pb-2 font-semibold'>
        <Label labelId={steps[currentStep - 1].description} />
      </div>
    </>
  );
};

export default ProgressSteps;
