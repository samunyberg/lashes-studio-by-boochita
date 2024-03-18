import AvailabilityIndicator from './AvailabilityIndicator';

const Legend = () => {
  return (
    <div className='my-4 flex max-w-fit items-center gap-4'>
      <AvailabilityIndicator />
      <span>Available times left</span>
    </div>
  );
};

export default Legend;
