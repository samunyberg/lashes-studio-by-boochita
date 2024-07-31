import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from './common/Button';

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
}

interface Props {
  className?: string;
  itemsCount: number;
}

const Pagination = ({ className, itemsCount }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentPage = parseInt(searchParams.get('pageNumber') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const totalPages = Math.ceil(itemsCount / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      router.replace(`${pathName}?pageNumber=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages)
      router.replace(`${pathName}?pageNumber=${currentPage + 1}`);
  };

  const renderResults = () => (
    <div className='flex gap-3 text-sm font-medium'>
      <span>{`Results: ${itemsCount}`}</span>
      <span>|</span>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
    </div>
  );

  return (
    <div
      className={`flex items-center justify-between ${className && className}`}
    >
      <Button
        className='!h-fit !px-2 !py-1 !text-sm'
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {renderResults()}
      <Button
        className='!h-fit !px-2 !py-1 !text-sm'
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
