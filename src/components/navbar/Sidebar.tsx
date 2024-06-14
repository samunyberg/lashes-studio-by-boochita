import { MdClose } from 'react-icons/md';
import NavLinks from './NavLinks';

interface Props {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar = ({ isOpen, onToggleSidebar }: Props) => {
  return (
    <aside
      className={`${
        isOpen ? 'left-0 w-screen' : '-left-52 max-w-0'
      } fixed top-0 z-[999] flex h-screen flex-row transition-all duration-300 lg:hidden`}
    >
      <div className='bg-bgSoft px-5 py-4 shadow-md backdrop-blur-lg'>
        <button onClick={() => onToggleSidebar()} className='mb-8'>
          <MdClose size={30} />
        </button>
        <NavLinks onLinkClick={onToggleSidebar} />
      </div>
      <div className='flex-1' onClick={() => onToggleSidebar()}></div>
    </aside>
  );
};

export default Sidebar;
