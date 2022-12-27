import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {middelware} from 'store/middelware';

import reducers from './reducers';
import {InventoriesState} from './state';

export const inventoriesSlice = createSlice({
  name: 'inventories',
  initialState: {} as InventoriesState,
  reducers,
});

export const {
  inventoryAdd,
  inventoryDelete,
  // inventoryEditName,
  // inventoryUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
} = inventoriesSlice.actions;

export default inventoriesSlice.reducer;

// middelware({
//   matcher: isAnyOf(inventoryEditName),
//   effect: async (action, listenerApi) => {
//     let index = action?.payload.index;
//     if (index) {
//       listenerApi.dispatch(inventoryUpdatedAt(index));
//     }
//   },
// });
