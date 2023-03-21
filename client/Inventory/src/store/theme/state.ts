import { CategoryType } from 'store/catalog/state';

export type Theme = 'light' | 'dark';

type CategoryColorType = Record<
  CategoryType,
  { colorOne: string; colorTwo: string }
>;

export const categoryColors: CategoryColorType = {
  Aktionsprodukte: { colorOne: '#02ab8ad6', colorTwo: '#27fdd4ff' },
  '(1) Frisch- & TK-Ware': { colorOne: '#ab0241d6', colorTwo: '#ff0061ff' },
  '(2) Frisch- & TK-Ware': { colorOne: '#93ab02d6', colorTwo: '#d1f004ff' },
  'Soßen, Dips & Dressings': { colorOne: '#02ab46d6', colorTwo: '#00ff66ff' },
  'Dosen- & Trockenware': { colorOne: '#028bacd6', colorTwo: '#55ddffff' },
  Getränke: { colorOne: '#7002abd6', colorTwo: '#9c00f0ff' },
  Verpackungen: { colorOne: '#4602acd6', colorTwo: '#6600ffff' },
  'Desserts (TK)': { colorOne: '#575757d6', colorTwo: '#808080ff' },
};

export const darkTheme: Style = {
  text: '#DCDDDE',
  textDim: '#ABB0B6',
  colorOne: '#72767D',
  colorTwo: '#3B3E45',
  colorThree: '#36393F',
  colorFour: '#2F3136',
  colorFive: '#292B2F',
  colorSix: '#202225',
  colorBlue: '#c1d3fe',
  colorGreen: '#98f5e1',
  colorRed: '#ff4d6d',
  categoryColors,
};

export const lightTheme: Style = {
  text: '#232221',
  textDim: '#544f49',
  colorOne: '#8d8982',
  colorTwo: '#c4c1ba',
  colorThree: '#c9c6c0',
  colorFour: '#d0cec9',
  colorFive: '#d6d4d0',
  colorSix: '#dfddda',
  colorBlue: '#4848ff',
  colorGreen: '#00e9a8ff',
  colorRed: '#ff274eff',
  categoryColors,
};

export interface Style {
  text: string;
  textDim: string;
  colorOne: string;
  colorTwo: string;
  colorThree: string;
  colorFour: string;
  colorFive: string;
  colorSix: string;
  colorBlue: string;
  colorGreen: string;
  colorRed: string;
  categoryColors: {
    [key in CategoryType]: { colorOne: string; colorTwo: string };
  };
}

export interface ThemeState {
  theme: Theme;
  style: Style;
}
