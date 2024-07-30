'use client';

import Pagination from '../Pagination';
import Table, { Config } from './Table';

export interface Data<T> {
  data: Data<T>[];
}

interface Props<T> {
  data: T[];
  itemsCount: number;
  config: Config<T>;
  keyFn: (item: T) => any;
}

const PaginatedTable = <T,>({ data, itemsCount, config, keyFn }: Props<T>) => {
  return (
    <div className='w-full overflow-x-auto'>
      <Table data={data} config={config} keyFn={keyFn} />
      <Pagination className='my-5' itemsCount={itemsCount} />
    </div>
  );
};

export default PaginatedTable;
