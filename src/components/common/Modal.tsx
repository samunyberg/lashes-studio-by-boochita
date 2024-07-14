import { cn } from 'clsx-tailwind-merge';
import { ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';
import Portal from './Portal';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  header: ReactNode | string;
  content: ReactNode;
}

const Modal = ({ isVisible, onClose, header, content }: Props) => {
  return (
    <Portal>
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 transition-all md:flex md:items-center md:justify-center',
          {
            'top-0 z-50 bg-black/30': isVisible,
          }
        )}
      >
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 h-0 overflow-hidden rounded-tl-xl rounded-tr-xl bg-white transition-all duration-200 ease-out md:absolute md:inset-auto md:rounded-xl md:opacity-0 md:transition-opacity',
            {
              'h-fit max-h-[70%] min-h-[50%] w-screen md:max-h-[60%] md:min-h-[40%] md:w-fit md:min-w-[30%] md:max-w-[60%] md:opacity-100':
                isVisible,
            }
          )}
        >
          <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
            <div>{header}</div>
            <span className='cursor-pointer' onClick={() => onClose()}>
              <IoIosClose size={35} />
            </span>
          </div>
          <div className='px-2 pb-4 pt-2 md:px-4 md:py-6'>{content}</div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
