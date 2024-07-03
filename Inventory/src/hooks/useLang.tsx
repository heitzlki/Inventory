import { useDispatch, useSelector } from 'react-redux';
import { LangState, Lang } from 'store/lang/state';
import { setLang } from 'store/lang';
import { useMemo } from 'react';

export const langEn: Translation = {
  language: 'Language',
  language_name: 'English',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  signOut: 'Sign Out',
  password: 'Password',
  email: 'Email',
  id: 'ID',
  name: 'Name',
  amount: 'Amount',
  active: 'Active',
  yes: 'yes',
  no: 'no',
  home: 'Home',
  catalog: 'Catalog',
  reminder: 'Reminder',
  settings: 'Settings',
  category: 'Category',
  unit: 'Unit',
  inventory: 'Inventory',
  theme: 'Theme',
  search: 'Search',
  product: 'Product',
  save: 'Save',
  delete: 'Delete',
  lang: {
    de_DE: 'German',
    en_EN: 'English',
  },
};

export const langDe: Translation = {
  language: 'Sprache',
  language_name: 'Deutsch',
  signIn: 'Anmelden',
  signUp: 'Konto Erstellen',
  signOut: 'Abmelden',
  password: 'Passwort',
  email: 'Email',
  id: 'ID',
  name: 'Name',
  amount: 'Menge',
  active: 'Aktiv',
  yes: 'ja',
  no: 'nein',
  home: 'Home',
  catalog: 'Katalog',
  reminder: 'Erinnerung',
  settings: 'Einstellungen',
  category: 'Kategorie',
  unit: 'Einheit',
  inventory: 'Inventur',
  theme: 'Thema',
  search: 'Suche',
  product: 'Produkt',
  save: 'Speichern',
  delete: 'Löschen',
  lang: {
    de_DE: 'Deutsch',
    en_EN: 'Englisch',
  },
};

export interface Translation {
  language: string;
  language_name: string;
  signIn: string;
  signUp: string;
  signOut: string;
  password: string;
  email: string;
  id: string;
  name: string;
  amount: string;
  active: string;
  yes: string;
  no: string;
  home: string;
  catalog: string;
  reminder: string;
  settings: string;
  category: string;
  unit: string;
  inventory: string;
  theme: string;
  search: string;
  product: string;
  save: string;
  delete: string;
  lang: {
    de_DE: string;
    en_EN: string;
  };
}

interface UseLang {
  lang: Lang;
  translations: Translation;
  setLang: (lang: Lang) => void;
}

export const useLang = (): UseLang => {
  const storeLang = useSelector(
    (state: { langReducer: LangState }) => state.langReducer.lang,
  );
  const dispatch = useDispatch();
  const translations = useMemo(() => {
    switch (storeLang) {
      case 'de_DE':
        return langDe;
      case 'en_EN':
        return langEn;
      default:
        return langDe;
    }
  }, [storeLang]);

  const setLangWrapper = (lang: Lang) => {
    dispatch(setLang({ lang }));
  };

  return { lang: storeLang, translations, setLang: setLangWrapper };
};
