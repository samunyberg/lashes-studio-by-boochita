import { cn } from 'clsx-tailwind-merge';
import _ from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from './common/Button';

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

  const renderPages = () => (
    <span className='hidden text-sm font-medium lg:flex'>
      {_.range(0, totalPages).map((p, i) => (
        <span
          className={cn(
            'flex min-w-8 cursor-pointer items-center justify-center border border-black/20 p-1 transition-all first:rounded-bl-sm first:rounded-tl-sm last:rounded-br-sm last:rounded-tr-sm lg:hover:bg-bgSofter',
            {
              'bg-bgSoft font-semibold': i === currentPage - 1,
            }
          )}
          onClick={() => router.replace(`${pathName}?pageNumber=${i + 1}`)}
        >
          {i + 1}
        </span>
      ))}
    </span>
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
      {renderPages()}
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
