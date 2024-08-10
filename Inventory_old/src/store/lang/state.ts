export type Lang = 'en_EN' | 'de_DE';

export const validLangs: Lang[] = ['en_EN', 'de_DE'];

export interface LangState {
  lang: Lang;
}
