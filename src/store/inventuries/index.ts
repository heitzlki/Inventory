import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { middelware } from 'store/middelware';

import reducers from './reducers';
import { InventuriesState } from './state';

export const inventuriesSlice = createSlice({
  name: 'inventuries',
  initialState: {} as InventuriesState,
  reducers,
});

export const {
  inventuryAdd,
  inventuryDelete,
  // inventuryEditName,
  // inventuryUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
} = inventuriesSlice.actions;

export default inventuriesSlice.reducer;

// middelware({
//   matcher: isAnyOf(inventuryEditName),
//   effect: async (action, listenerApi) => {
//     let index = action?.payload.index;
//     if (index) {
//       listenerApi.dispatch(inventuryUpdatedAt(index));
//     }
//   },
// });
