import React from 'react';
import BookingTime from './BookingTime';
import { Step } from './BookingForm';
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
