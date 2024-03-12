import Image from 'next/image';
import Link from 'next/link';
import { MotionContainer } from './MotionContainer';

const Intro = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8 md:gap-12">
        <MotionContainer
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
        >
          <div className="relative h-[100px] w-[300px] md:h-[120px] md:w-[320px] lg:h-[160px] lg:w-[340px]">
            <Image
              src="/images/lashes.png"
              alt="lashes"
              priority
              fill
              className="object-contain"
            />
          </div>
        </MotionContainer>
        <div className="flex flex-col items-center gap-2 text-center text-4xl uppercase tracking-wide md:text-6xl lg:flex-row">
          <h1>Lashes Studio by</h1>
          <MotionContainer
            initial={{ y: '-50%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            className="bg-gradient-to-tr from-accent to-pink-400 bg-clip-text text-transparent"
          >
            Boochita
          </MotionContainer>
        </div>
        <MotionContainer
          initial={{ x: '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeIn' }}
          className="lg:self-start"
        >
          <button className="rounded-sm border-2 border-primary px-4 py-2 font-medium transition-all hover:bg-bgSoft">
            <Link href="/book">BOOK APPOINTMENT</Link>
          </button>
        </MotionContainer>
      </div>
    </div>
  );
};

export default Intro;
