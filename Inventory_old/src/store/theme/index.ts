import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Theme } from 'store/theme/state';
import { ThemeState } from 'store/theme/state';

const initialState: ThemeState = {
  theme: 'dark',
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
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
