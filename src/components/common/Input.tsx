interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id?: string;
  label?: string;
  placeholder: string;
  error?: string;
}

const Input = ({
  className,
  id,
  label,
  placeholder,
  error,
  ...rest
}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
      {label && (
        <label htmlFor={id} className='text-sm'>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-sm p-2 shadow placeholder:text-sm focus:outline-2 focus:outline-accent ${error && 'outline outline-red-300'} ${className && className}`}
        placeholder={placeholder}
        {...rest}
      />
      {error && <div className='text-sm text-red-400'>{error}</div>}
    </div>
  );
};

export default Input;
