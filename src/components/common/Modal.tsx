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
        className={cn('fixed bottom-0 left-0 right-0 transition-all', {
          'top-0 bg-black/30 z-50': isVisible,
        })}
      >
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 max-h-[0%] overflow-hidden overflow-y-visible transition-all duration-200 ease-out',
            {
              'max-h-[80%]': isVisible,
            }
          )}
        >
          <div className='z-50 h-full w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-white pb-20'>
            <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
              <div>{header}</div>
              <span onClick={() => onClose()}>
                <IoIosClose size={35} />
              </span>
            </div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
