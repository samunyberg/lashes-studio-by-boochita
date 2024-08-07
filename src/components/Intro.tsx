'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from './common/Button';
import Label from './common/Label';
import { MotionContainer } from './common/MotionContainer';

const Intro = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='flex flex-col items-center gap-8 pb-24 md:gap-12'>
        <Image
          src='/images/intro-image.jpg'
          alt='lashes'
          priority
          width={500}
          height={300}
          className='object-contain'
        />
        <div className='flex flex-col items-center gap-12 text-center'>
          <h1 className='text-4xl uppercase tracking-wide md:text-6xl'>
            Lashes Studio by Boochita
          </h1>
          <MotionContainer
            initial={{ y: '-50%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
          >
            <Link href='/book'>
              <Button variant='accent' className='!px-5 !py-3 !text-[17px]'>
                <Label labelId='book_appointment' />
              </Button>
            </Link>
          </MotionContainer>
        </div>
      </div>
    </div>
  );
};

export default Intro;
