import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DrawerState } from 'store/drawer/state';
import { withSpring } from 'react-native-reanimated';
import { MAX_TRANSLATE_X } from 'components/DrawerSheet';

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState: { translateX: 0, active: false },
  reducers: {
    activate: (state: DrawerState) => {
      'worklet';

      state.active = !state.active;
    },

    // scrollTo: (
    //   state: DrawerState,
    //   action: PayloadAction<{ destination: number }>,
    // ) => {
    //   'worklet';

    //   state.active = action.payload.destination <= 0 ? false : true;

    //   state.translateX = withSpring(action.payload.destination, {
    //     damping: 50,
    //   });
    // },
  },
});

export const { activate } = drawerSlice.actions;

export default drawerSlice.reducer;
