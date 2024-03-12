import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  links: {
    href: string;
    label: string;
  }[];
  isOpen: boolean;
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ links, isOpen, toggleSidebar }: Props) => {
  return (
    <aside
      className={`${
        isOpen ? 'left-0 h-screen w-screen' : '-left-52 max-w-0'
      } fixed top-0 z-[999] flex flex-row transition-all duration-300`}
    >
      <div className="flex-1 bg-bgSoft px-5 py-4 shadow-md backdrop-blur-lg">
        <button onClick={() => toggleSidebar(false)}>
          <MdClose size={30} />
        </button>
        <ul className="flex h-screen flex-col gap-8 whitespace-nowrap pt-8">
          {links.map((link) => (
            <li key={link.label}>
              <Link href={link.href} onClick={() => toggleSidebar(false)}>
                {link.label.toUpperCase()}
              </Link>
              <hr className="border-1 border-accent" />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="h-full w-full flex-1"
        onClick={() => toggleSidebar(false)}
      ></div>
    </aside>
  );
};

export default Sidebar;
