import Image from 'next/image';
import Link from 'next/link';
import { MotionContainer } from './common/MotionContainer';
import Button from './common/Button';

const Intro = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-8 md:gap-12'>
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <div className='relative h-[100px] w-[300px] md:h-[120px] md:w-[320px] lg:h-[160px] lg:w-[340px]'>
            <Image
              src='/images/lashes.png'
              alt='lashes'
              priority
              fill
              className='object-contain'
            />
          </div>
        </MotionContainer>
        <div className='flex flex-col items-center gap-2 text-center text-4xl uppercase tracking-wide text-primary md:text-6xl lg:flex-row'>
          <h1>Lashes Studio by</h1>
          <MotionContainer
            initial={{ y: '-50%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className='text-accent'
          >
            Boochita
          </MotionContainer>
        </div>
        <MotionContainer
          initial={{ x: '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <Link href='/book'>
            <Button variant='primary' label='Book Appointment' />
          </Link>
        </MotionContainer>
      </div>
    </div>
  );
};

export default Intro;
