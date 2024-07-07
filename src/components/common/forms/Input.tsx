interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  label?: string;
  placeholder?: string;
}

const Input = ({ className, id, label, placeholder, ...rest }: Props) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
      )}
      <input
        id={id}
        placeholder={placeholder}
        className={`w-full rounded-sm p-2 shadow placeholder:text-sm focus:outline-2 focus:outline-accent group-[.invalid]:outline group-[.invalid]:outline-1 group-[.invalid]:outline-red-400 ${className && className}`}
        {...rest}
      />
    </>
  );
};

export default Input;
