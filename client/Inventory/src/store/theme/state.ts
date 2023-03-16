import { CategoryType } from 'store/catalog/state';

export type Theme = 'light' | 'dark';

// #ff2a2aff
// #ff2e64ff
// #ff6600ff
// #d1f004ff
// #00ff66ff
// #00ffbbff
// #00ccffff
// #9b00f0ff

export const categoryColors = {
  Aktionsprodukte: { colorOne: '#ff2a2aff', colorTwo: '#ff2a2ad6' },
  '(1) Frisch- & TK-Ware': { colorOne: '#ff2e64ff', colorTwo: '#ff2e64d6' },
  '(2) Frisch- & TK-Ware': { colorOne: '#ff6600ff', colorTwo: '#ff6600d6' },
  'Soßen, Dips & Dressings': { colorOne: '#d1f004ff', colorTwo: '#d1f004d6' },
  'Dosen- & Trockenware': { colorOne: '#00ff66ff', colorTwo: '#00ff66d6' },
  Getränke: { colorOne: '#00ffbbff', colorTwo: '#00ffbbd6' },
  Verpackungen: { colorOne: '#00ccffff', colorTwo: '#00ccffd6' },
  'Desserts (TK)': { colorOne: '#9b00f0ff', colorTwo: '#9b00f0d6' },
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
  categoryColors: {
    [key in CategoryType]: { colorOne: string; colorTwo: string };
  };
}

export interface ThemeState {
  theme: Theme;
  style: Style;
}
