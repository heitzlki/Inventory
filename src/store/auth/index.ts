import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {AuthState} from 'store/auth/state';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {signedIn: false, token: ''},
  reducers: {
    signIn: (state: AuthState, action: PayloadAction<{token: string}>) => {
      if (action.payload.token == 'test') {
        state.token = action.payload.token;
        state.signedIn = true;
      }
    },

    signOut: (state: AuthState) => {
      state.token = '';
      state.signedIn = false;
    },
  },
});

export const {signIn, signOut} = authSlice.actions;

export default authSlice.reducer;
