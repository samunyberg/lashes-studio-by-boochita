import { cn } from 'clsx-tailwind-merge';

interface Props {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant: 'primary' | 'accent';
}

const Button = ({ label, type, variant }: Props) => {
  return (
    <button
      type={type}
      className={cn(
        'rounded-sm border-2 border-primary p-2 px-4 font-medium tracking-wide transition-all hover:bg-accent hover:text-white',
        {
          'bg-accent text-white': variant === 'accent',
        }
      )}
    >
      {label}
    </button>
  );
};

export default Button;
