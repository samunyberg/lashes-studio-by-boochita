import useLanguage from '@/hooks/useLanguage';
import React from 'react';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useLanguage();

  return currentLanguage === 'en' ? (
    <span onClick={() => changeLanguage('fi')}>Fi</span>
  ) : (
    <span onClick={() => changeLanguage('en')}>En</span>
  );
};

export default LanguageSwitcher;
