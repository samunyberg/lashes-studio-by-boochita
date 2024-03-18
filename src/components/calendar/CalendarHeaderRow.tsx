const dayNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const CalendarHeaderRow = () => {
  return (
    <div className='grid grid-cols-7 gap-1'>
      {dayNames.map((dayName) => (
        <div key={dayName} className='p-4 font-medium tracking-wide'>
          {dayName}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeaderRow;
