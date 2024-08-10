import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LangState } from 'store/lang/state';

const initialState: LangState = {
  lang: 'de_DE',
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLang(state, action: PayloadAction<LangState>) {
      state.lang = action.payload.lang;
    },
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
