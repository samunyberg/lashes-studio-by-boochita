import { MdClose } from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
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
      <div className='w-[45%] bg-bgSoft px-5 py-4 shadow-md backdrop-blur-lg'>
        <div className='flex justify-between'>
          <MdClose size={30} onClick={() => onToggleSidebar()} />
          <LanguageSwitcher />
        </div>
        <NavLinks onLinkClick={onToggleSidebar} />
      </div>
      <div className='flex-1' onClick={() => onToggleSidebar()}></div>
    </aside>
  );
};

export default Sidebar;
