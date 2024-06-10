import AvailabilityIndicator from './AvailabilityIndicator';

const Legend = () => {
  return (
    <div className='my-4 ml-4 flex max-w-fit flex-col gap-2 text-sm'>
      <div>
        <div className='flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={true}
            isPassedDay={false}
          />
          <span>Available times left</span>
        </div>
        <div className='flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={false}
            isPassedDay={false}
          />
          <span>No available times for this date</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;
