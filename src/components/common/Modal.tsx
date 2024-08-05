import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';
import CloseOnSwipeDown from './CloseOnSwipeDown';
import Portal from './Portal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  header: ReactNode | string;
  content: ReactNode;
}

const Modal = ({ isVisible, onClose, header, content }: Props) => {
  const head = (
    <CloseOnSwipeDown onClose={onClose}>
      <div className='flex items-center justify-center pt-2'>
        <div className='h-1 w-16 rounded-md bg-black/20 md:hidden' />
      </div>
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
        <div>{header}</div>
        <IoIosClose
          size={35}
          className='cursor-pointer'
          onClick={() => onClose()}
        />
      </div>
    </CloseOnSwipeDown>
  );

  const body = (
    <div className='max-h-[calc(100vh-200px)] overflow-y-auto px-2 pb-12 pt-5 md:px-5'>
      {content}
    </div>
  );

  return (
    <Portal>
      <div
        className={
          isVisible
            ? 'fixed inset-0 z-[999] bg-black/30 transition-all duration-300 md:flex md:items-center md:justify-center'
            : ''
        }
      >
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 max-h-0 touch-none rounded-tl-xl rounded-tr-xl bg-white transition-all duration-300 ease-out md:inset-auto md:hidden md:min-w-[400px] md:max-w-[450px] md:rounded-md lg:max-w-[500px]',
            {
              'max-h-full md:inline': isVisible,
            }
          )}
        >
          {head}
          {body}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
