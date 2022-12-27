import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { middelware } from 'store/middelware';

import reducers from './reducers';
import { InventoryiesState } from './state';

export const inventoriesSlice = createSlice({
  name: 'inventories',
  initialState: {} as InventoryiesState,
  reducers,
});

export const {
  inventoryyAdd,
  inventoryyDelete,
  // inventoryyEditName,
  // inventoryyUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
} = inventoriesSlice.actions;

export default inventoriesSlice.reducer;

// middelware({
//   matcher: isAnyOf(inventoryyEditName),
//   effect: async (action, listenerApi) => {
//     let index = action?.payload.index;
//     if (index) {
//       listenerApi.dispatch(inventoryyUpdatedAt(index));
//     }
//   },
// });
