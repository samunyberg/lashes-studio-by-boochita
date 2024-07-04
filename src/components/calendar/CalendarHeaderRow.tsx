import Label from '../common/Label';

const CalendarHeaderRow = () => {
  const dayNames = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  const renderedDays = dayNames.map((dayName) => (
    <div key={dayName} className='p-4 text-xs tracking-wide'>
      <Label labelId={dayName} />
    </div>
  ));

  return <div className='grid grid-cols-7 gap-1'>{renderedDays}</div>;
};

export default CalendarHeaderRow;
