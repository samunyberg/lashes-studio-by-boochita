'use client';

import { useState } from 'react';
import Button from '../common/Button';

export interface Config<T> {
  label: string;
  render: (item: T) => any;
}

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  config: Config<T>[];
  keyFn: (item: T) => any;
  itemsPerPage?: number;
}

const Table = <T,>({ data, config, keyFn, itemsPerPage = 10 }: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='w-full overflow-x-auto'>
      <table className='min-w-full table-auto'>
        <thead className='tracking-wide'>
          <tr>
            {config.map((column) => (
              <th
                key={column.label}
                className='border-b border-primary py-2 pl-3 text-start'
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-bgSofter'>
          {paginatedData.map((rowData) => (
            <tr key={keyFn(rowData)} className='border-b'>
              {config.map((column) => (
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
      <div className='my-5 flex flex-wrap items-center justify-center gap-3'>
        <Button
          className='!h-fit !px-2 !py-1 !text-sm'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className='text-sm font-medium'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className='!h-fit !px-2 !py-1 !text-sm'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Table;
