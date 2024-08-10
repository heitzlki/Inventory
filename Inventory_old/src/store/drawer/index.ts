import { createSlice } from '@reduxjs/toolkit';

import { DrawerState } from 'store/drawer/state';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: { active: false },
  reducers: {
    activate: (state: DrawerState) => {
      'worklet';

      state.active = !state.active;
    },
  },
});

export const { activate } = drawerSlice.actions;

export default drawerSlice.reducer;
