import AvailabilityIndicator from './AvailabilityIndicator';

const Legend = () => {
  return (
    <div className='my-4 flex flex-col gap-2 bg-bgSoft p-3 text-sm shadow'>
      <div>
        <div className='mb-3'>
          Click a date in calendar to see appointment times.
        </div>
        <div className='ml-4 flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={true}
            isPassedDay={false}
          />
          <span>Available times left</span>
        </div>
        <div className='ml-4 flex items-center gap-2'>
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
