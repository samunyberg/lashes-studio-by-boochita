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
    <>
      <div className='flex items-center justify-center pt-2'>
        <CloseOnSwipeDown onClose={onClose} />
      </div>
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-3'>
        <div>{header}</div>
        <span className='cursor-pointer' onClick={() => onClose()}>
          <IoIosClose size={35} />
        </span>
      </div>
    </>
  );

  const body = <div className='px-2 pb-12 pt-2'>{content}</div>;

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
            'fixed bottom-0 left-0 right-0 max-h-0 overflow-hidden rounded-tl-xl rounded-tr-xl bg-white transition-all duration-300 ease-out md:inset-auto md:min-w-[25%] md:max-w-[60%] md:rounded-md',
            {
              'max-h-[70%]': isVisible,
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
