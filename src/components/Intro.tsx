import Image from 'next/image';
import Link from 'next/link';
import Button from './common/Button';
import { MotionContainer } from './common/MotionContainer';

const Intro = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-8 pb-24 md:gap-12'>
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <Image
            src='/images/intro-image.jpg'
            alt='lashes'
            priority
            height={300}
            width={500}
            className='object-contain'
          />
        </MotionContainer>
        <div className='flex flex-col items-center gap-2 text-center text-4xl uppercase tracking-wide text-primary md:text-6xl lg:flex-row'>
          <h1>Lashes Studio by Boochita</h1>
        </div>
        <MotionContainer
          initial={{ x: '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <Link href='/book'>
            <Button variant='accent' label='Book Appointment' />
          </Link>
        </MotionContainer>
      </div>
    </div>
  );
};

export default Intro;
