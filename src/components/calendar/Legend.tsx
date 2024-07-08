import Label from '../common/Label';
import Panel from '../common/Panel';
import AvailabilityIndicator from './AvailabilityIndicator';

const Legend = () => {
  return (
    <Panel className='my-4 flex flex-col gap-2 p-2 text-sm'>
      <div>
        <div className='mb-3'>
          <Label labelId='click_to_see_times' />
        </div>
        <div className='ml-4 flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={true}
            isPassedDay={false}
          />
          <Label labelId='available_times_left' />
        </div>
        <div className='ml-4 flex items-center gap-2'>
          <AvailabilityIndicator
            dayHasAvailableAppointments={false}
            isPassedDay={false}
          />
          <Label labelId='no_available_times_left' />
        </div>
      </div>
    </Panel>
  );
};

export default Legend;
