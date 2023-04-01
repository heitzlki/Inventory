import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Lang, LangState } from 'store/lang/state';

const initialState: LangState = {
  lang: 'de_DE',
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<{ lang?: Lang }>) {
      if (action.payload.lang) {
        state.lang = action.payload.lang;
      } else {
        state.lang = 'en_EN';
      }
    },
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
