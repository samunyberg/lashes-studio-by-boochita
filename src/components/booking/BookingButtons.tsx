import Button from '../common/Button';

interface Props {
  currentStep: number;
  onBackClick: () => void;
  onNextClick: () => void;
  isNextDisabled: boolean;
  isSubmitting: boolean;
}

const BookingButtons = ({
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
        label={currentStep === 4 ? 'Book this appointment' : 'Next'}
        onClick={onNextClick}
        disabled={isNextDisabled}
        isLoading={isSubmitting}
      />
      {currentStep > 1 && (
        <Button variant='primary' label='Back' onClick={onBackClick} />
      )}
    </div>
  );
};

export default BookingButtons;
