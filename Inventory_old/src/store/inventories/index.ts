import { createSlice } from '@reduxjs/toolkit';

import reducers from './reducers';
import { InventoriesState } from './state';

export const inventoriesSlice = createSlice({
  name: 'inventories',
  initialState: {} as InventoriesState,
  reducers,
});

export const {
  inventoryAdd,
  inventoryEdit,
  inventoryDelete,
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
} = inventoriesSlice.actions;

export default inventoriesSlice.reducer;
