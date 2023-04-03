import { useMemo } from 'react';
import { CategoryType } from 'store/catalog/state';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { setTheme } from 'store/theme';
import { Theme } from 'store/theme/state';

type CategoryColorType = Record<
  CategoryType,
  { primary: string; secondary: string }
>;

export const paletteCategory: CategoryColorType = {
  Aktionsprodukte: { primary: '#02ab8ad6', secondary: '#27fdd4ff' },
  '(1) Frisch- & TK-Ware': { primary: '#ab0241d6', secondary: '#ff0061ff' },
  '(2) Frisch- & TK-Ware': { primary: '#93ab02d6', secondary: '#d1f004ff' },
  'Soßen, Dips & Dressings': { primary: '#02ab46d6', secondary: '#00ff66ff' },
  'Dosen- & Trockenware': { primary: '#028bacd6', secondary: '#55ddffff' },
  Getränke: { primary: '#7002abd6', secondary: '#9c00f0ff' },
  Verpackungen: { primary: '#4602acd6', secondary: '#6600ffff' },
  'Desserts (TK)': { primary: '#575757d6', secondary: '#808080ff' },
};

export const darkTheme: Style = {
  colors: {
    paletteTextMain: '#DCDDDE',
    paletteTextLight: '#ABB0B6',
    paletteOne: '#72767D',
    paletteTwo: '#3B3E45',
    paletteThree: '#36393F',
    paletteFour: '#2F3136',
    paletteFive: '#292B2F',
    paletteSix: '#202225',
    palettePrimaryBlue: '#c1d3fe',
    palettePrimaryGreen: '#98f5e1',
    palettePrimaryRed: '#ff4d6d',
    paletteCategory,
  },
};

export const lightTheme: Style = {
  colors: {
    paletteTextMain: '#232221',
    paletteTextLight: '#544f49',
    paletteOne: '#8d8982',
    paletteTwo: '#c4c1ba',
    paletteThree: '#c9c6c0',
    paletteFour: '#d0cec9',
    paletteFive: '#d6d4d0',
    paletteSix: '#dfddda',
    palettePrimaryBlue: '#4848ff',
    palettePrimaryGreen: '#00e9a8ff',
    palettePrimaryRed: '#ff274eff',
    paletteCategory,
  },
};

export interface Style {
  colors: {
    paletteTextMain: string;
    paletteTextLight: string;
    paletteOne: string;
    paletteTwo: string;
    paletteThree: string;
    paletteFour: string;
    paletteFive: string;
    paletteSix: string;
    palettePrimaryBlue: string;
    palettePrimaryGreen: string;
    palettePrimaryRed: string;
    paletteCategory: {
      [key in CategoryType]: { primary: string; secondary: string };
    };
  };
}

export const useStyles = () => {
  const storeTheme = useSelector(
    (state: RootState) => state.themeReducer.theme,
  );

  const styles = useMemo(() => {
    return storeTheme === 'light' ? lightTheme : darkTheme;
  }, [storeTheme]);

  const dispatch = useDispatch();

  const setThemeWrapper = (theme: Theme) => {
    dispatch(setTheme({ theme }));
  };

  return { theme: storeTheme, styles, setTheme: setThemeWrapper };
};
