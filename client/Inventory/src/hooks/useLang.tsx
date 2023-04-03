import { useDispatch, useSelector } from 'react-redux';
import { LangState, Lang } from 'store/lang/state';
import { setLang } from 'store/lang';

export const langEn: Translation = {
  Hello: 'Hello',
};

export const langDe: Translation = {
  Hello: 'Hallo',
};

export interface Translation {
  Hello: string;
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

  const translations = storeLang === 'de_DE' ? langDe : langEn;

  const setLangWrapper = (lang: Lang) => {
    dispatch(setLang({ lang }));
  };

  return { lang: storeLang, translations, setLang: setLangWrapper };
};
