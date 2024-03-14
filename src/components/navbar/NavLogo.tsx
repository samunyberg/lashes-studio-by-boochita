import Link from 'next/link';
import { GiClawSlashes } from 'react-icons/gi';

const NavLogo = () => {
  return (
    <Link href='/'>
      <div className='hidden items-center gap-2 whitespace-nowrap text-lg uppercase tracking-wide lg:flex'>
        <GiClawSlashes size={20} />
        Lashes Studio by Boochita
      </div>
    </Link>
  );
};

export default NavLogo;
