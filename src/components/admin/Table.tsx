'use client';

export interface Config<T> {
  showHeaderRow?: boolean;
  columns: {
    label: string;
    render: (item: T) => any;
  }[];
}

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  config: Config<T>;
  keyFn: (item: T) => any;
}

const Table = <T,>({ data, config, keyFn }: Props<T>) => {
  const showHeader = config.showHeaderRow ?? true;

  return (
    <div className='w-full overflow-x-auto'>
      <table className='min-w-full table-auto'>
        {showHeader && (
          <thead className='tracking-wide'>
            <tr>
              {config.columns.map((column) => (
                <th
                  key={column.label}
                  className='border-b border-black/10 py-2 pl-3 text-start'
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((rowData) => (
            <tr key={keyFn(rowData)} className='border-b border-black/10'>
              {config.columns.map((column) => (
                <td
                  key={column.label}
                  className='whitespace-nowrap px-3 py-3 font-medium'
                >
                  {column.render(rowData)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
