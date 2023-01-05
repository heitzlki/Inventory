import { createSlice } from '@reduxjs/toolkit';

import { ReminderState } from 'store/reminder/state';
import type { PayloadAction } from '@reduxjs/toolkit';

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState: { active: false, time: new Date().toString() },
  reducers: {
    reminderActivate: (state: ReminderState) => {
      state.active = !state.active;
    },
    reminderSetTime: (
      state: ReminderState,
      action: PayloadAction<{ newTime: string }>,
    ) => {
      state.time = action.payload.newTime;
    },
  },
});

export const { reminderActivate, reminderSetTime } = reminderSlice.actions;

export default reminderSlice.reducer;
