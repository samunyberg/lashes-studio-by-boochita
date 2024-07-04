import Button from '../common/Button';
import Label from '../common/Label';
import { Step } from './BookingForm';

interface Props {
  steps: Step[];
  currentStep: number;
  onBackClick: () => void;
  onNextClick: () => void;
  isNextDisabled: boolean;
  isSubmitting: boolean;
}

const BookingButtons = ({
  steps,
  currentStep,
  onBackClick,
  onNextClick,
  isNextDisabled,
  isSubmitting,
}: Props) => {
  return (
    <div className='flex flex-col gap-5 md:flex-row-reverse md:justify-between'>
      <Button
        variant='accent'
        onClick={onNextClick}
        disabled={isNextDisabled}
        isLoading={isSubmitting}
      >
        {currentStep === steps.length ? (
          <Label labelId='book_this_appointment' />
        ) : (
          <Label labelId='next' />
        )}
      </Button>
      {currentStep > 1 && (
        <Button variant='primary' onClick={onBackClick}>
          <Label labelId='back' />
        </Button>
      )}
    </div>
  );
};

export default BookingButtons;
