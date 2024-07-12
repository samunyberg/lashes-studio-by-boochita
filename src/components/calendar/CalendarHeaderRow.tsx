import Label from '../common/Label';

const CalendarHeaderRow = () => {
  const dayNames = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  const renderedDays = dayNames.map((dayName) => (
    <div key={dayName} className='h-full px-2 text-xs font-medium tracking-wide'>
      <Label labelId={dayName} />
    </div>
  ));

  return <div className='grid grid-cols-7'>{renderedDays}</div>;
};

export default CalendarHeaderRow;
