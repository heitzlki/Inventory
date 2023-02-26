export type Theme = 'light' | 'dark';

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
}

export interface ThemeState {
  theme: Theme;
  style: Style;
}
