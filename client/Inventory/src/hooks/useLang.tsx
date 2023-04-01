import { useState } from 'react';

// import { CategoryType } from 'store/catalog/state';

import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'store/theme';
import { RootState } from 'store/index';
import { LangState } from 'store/lang/state';

// type CategoryColorType = Record<
//   CategoryType,
//   { primary: string; secondary: string }
// >;

// export const paletteCategory: CategoryColorType = {
//   Aktionsprodukte: { primary: '#02ab8ad6', secondary: '#27fdd4ff' },
//   '(1) Frisch- & TK-Ware': { primary: '#ab0241d6', secondary: '#ff0061ff' },
//   '(2) Frisch- & TK-Ware': { primary: '#93ab02d6', secondary: '#d1f004ff' },
//   'Soßen, Dips & Dressings': { primary: '#02ab46d6', secondary: '#00ff66ff' },
//   'Dosen- & Trockenware': { primary: '#028bacd6', secondary: '#55ddffff' },
//   Getränke: { primary: '#7002abd6', secondary: '#9c00f0ff' },
//   Verpackungen: { primary: '#4602acd6', secondary: '#6600ffff' },
//   'Desserts (TK)': { primary: '#575757d6', secondary: '#808080ff' },
// };

export const langEn: Lang = {

};

export const langDe: Lang = {

};

export interface Lang {

    // categories: {
    //   [key in CategoryType]: { primary: string; secondary: string };
    // };
  
}

export const useLang = () => {
  const storeLang = useSelector((state: RootState) => state.langReducer);

  const dispatch = useDispatch();

  const [lang, setLang] = useState<Lang>(storeLang.lang ?? 'en_EN');

  const changeLang = ({ lang }: LangState) => {
    switch (lang) {
      case 'en_EN':
        dispatch(setLang({ lang: 'en_EN' }));
        setLang(langEn);
        break;
      case 'de_DE':
        dispatch(setLang({ lang: 'de_DE' }));
        setLang(langDe);
        break;
      default:
  };

  return { lang, changeLang };
};
