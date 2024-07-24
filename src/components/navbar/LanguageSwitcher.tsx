import useClickOutside from '@/hooks/useClickOutside';
import useLanguage from '@/hooks/useLanguage';
import { Language } from '@/providers/language/LanguageProvider';
import { useRef, useState } from 'react';
import { MdLanguage } from 'react-icons/md';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useLanguage();
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setShowOptions(false));

  const option = (language: Language) => (
    <span
      className='cursor-pointer rounded-sm pl-2 transition-all lg:hover:bg-accent lg:hover:text-white'
      onClick={() => {
        changeLanguage(language);
        setShowOptions(false);
      }}
    >
      {language}
    </span>
  );

  return (
    <div ref={ref} className='relative font-medium tracking-wide'>
      <div
        className='flex w-[50px] cursor-pointer items-center justify-center gap-1 rounded-sm bg-bgSoft'
        onClick={() => setShowOptions(!showOptions)}
      >
        <span>{currentLanguage}</span>
        <MdLanguage />
      </div>
      {showOptions && (
        <div className='absolute inset-x-0 flex flex-col gap-1 rounded-bl-sm rounded-br-sm bg-bgSoft p-1'>
          {option('fi')}
          {option('en')}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
