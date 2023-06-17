import { useDispatch, useSelector } from 'react-redux';
import { LangState, Lang } from 'store/lang/state';
import { setLang } from 'store/lang';
import { useMemo } from 'react';

export const langEn: Translation = {
  signIn: 'Sign In',
  signUp: 'Sign Up',
  signOut: 'Sign Out',
  password: 'Password',
  email: 'Email',
  id: 'ID',
  name: 'Name',
  amountOne: 'Amount One',
  amountTwo: 'Amount Two',
  amountType: 'Amount Type',
  active: 'Active',
  yes: 'yes',
  no: 'no',
  inventoryNotificationTitle: 'Inventory notification!',
  inventoryNotificationBody: "It's time for inventory",
  home: 'Home',
  catalog: 'Catalog',
  reminder: 'Reminder',
  settings: 'Settings',
  single: 'Single',
  double: 'Double',
  inventory: 'Inventory',
  theme: 'Theme',
};

export const langDe: Translation = {
  signIn: 'Anmelden',
  signUp: 'Konto Erstellen',
  signOut: 'Abmelden',
  password: 'Passwort',
  email: 'Email',
  id: 'ID',
  name: 'Name',
  amountOne: 'Menge eins',
  amountTwo: 'Menge zwei',
  amountType: 'Mengen typ',
  active: 'Aktiv',
  yes: 'ja',
  no: 'nein',
  inventoryNotificationTitle: 'Inventur Nachricht!',
  inventoryNotificationBody: 'Es ist zeit für die Inventur',
  home: 'Home',
  catalog: 'Katalog',
  reminder: 'Erinnerung',
  settings: 'Einstellungen',
  single: 'einzel',
  double: 'doppel',
  inventory: 'Inventur',
  theme: 'Thema',
};

export interface Translation {
  signIn: string;
  signUp: string;
  signOut: string;
  password: string;
  email: string;
  id: string;
  name: string;
  amountOne: string;
  amountTwo: string;
  amountType: string;
  active: string;
  yes: string;
  no: string;
  inventoryNotificationTitle: string;
  inventoryNotificationBody: string;
  home: string;
  catalog: string;
  reminder: string;
  settings: string;
  single: string;
  double: string;
  inventory: string;
  theme: string;
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
