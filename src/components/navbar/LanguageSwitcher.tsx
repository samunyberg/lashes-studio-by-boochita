import useLanguage from '@/hooks/useLanguage';
import { Language } from '@/providers/language/LanguageProvider';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useLanguage();

  return (
    <select
      className='cursor-pointer rounded-sm bg-bgSoft text-sm p-1'
      defaultValue={currentLanguage}
      onChange={(event) => changeLanguage(event.target.value as Language)}
    >
      <option className='cursor-pointer hover:bg-accent' value='fi'>
        Suomi
      </option>
      <option className='cursor-pointer' value='en'>
        English
      </option>
    </select>
  );
};

export default LanguageSwitcher;
