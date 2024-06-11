const CalendarHeaderRow = () => {
  const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const renderedDays = dayNames.map((dayName) => (
    <div key={dayName} className='p-4 text-xs tracking-wide'>
      {dayName}
    </div>
  ));

  return <div className='grid grid-cols-7 gap-1'>{renderedDays}</div>;
};

export default CalendarHeaderRow;
