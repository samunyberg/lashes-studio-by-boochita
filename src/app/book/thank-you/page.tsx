import Button from '@/components/common/Button';
import { MotionContainer } from '@/components/common/MotionContainer';
import { BsCheckCircle } from 'react-icons/bs';

interface Props {
  searchParams: {
    email: string;
  };
}

const ThankYouPage = ({ searchParams: { email } }: Props) => {
  return (
    <div className='h-[calc(100vh-4rem)] pt-32'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <BsCheckCircle size={90} />
        </MotionContainer>
        <h1 className='text-lg font-semibold'>Thank You!</h1>
        <p className='mb-5 px-3 text-center'>
          Your booking is confirmed. A confirmation email was sent to{' '}
          <span className='font-semibold'>{email}</span>.
        </p>
        <Button label='To Home Page' variant='primary' />
      </div>
    </div>
  );
};

export default ThankYouPage;
