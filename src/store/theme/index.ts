import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { lightTheme, darkTheme, Theme } from 'store/theme/state';
import { ThemeState } from 'store/theme/state';

const initialState: ThemeState = {
  theme: 'dark',
  style: darkTheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<{ theme?: Theme }>) {
      if (action.payload.theme) {
        state.theme = action.payload.theme;
      } else {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
      }
      state.style = state.theme === 'dark' ? darkTheme : lightTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
