import { FaSearch } from 'react-icons/fa';
import Input from './Input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  placeholder?: string;
}

const SearchInput = ({ id, placeholder, ...rest }: Props) => {
  return (
    <div className='relative flex w-full'>
      <Input id={id} placeholder={placeholder} {...rest} />
      <div className='absolute right-0 flex h-full items-center justify-center px-3'>
        <FaSearch size={18} />
      </div>
    </div>
  );
};

export default SearchInput;
