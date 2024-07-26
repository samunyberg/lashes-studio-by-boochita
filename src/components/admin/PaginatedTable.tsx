'use client';

import { useState } from 'react';
import Button from '../common/Button';
import Table, { Config } from './Table';

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  config: Config<T>;
  keyFn: (item: T) => any;
  itemsPerPage?: number;
}

const PaginatedTable = <T,>({
  data,
  config,
  keyFn,
  itemsPerPage = 10,
}: Props<T>) => {
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
      <Table data={paginatedData} config={config} keyFn={keyFn} />
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

export default PaginatedTable;
