import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ItemState, ItemsState, unit } from 'store/items/state';
import { middelware } from 'store/middelware';

const initialState: ItemsState = Array.from({ length: 30 }, (_, i) => ({
  title: `Item ${i}`,
  key: `key${i}`,
  amount: 0,
  unit: unit.kg,
}));

export const itemsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (
      state: ItemsState,
      action: PayloadAction<{ index: number }>,
    ) => {
      state[action.payload.index].amount += 1;
    },
    decrement: (
      state: ItemsState,
      action: PayloadAction<{ index: number }>,
    ) => {
      state[action.payload.index].amount -= 1;
    },
    deleteItem: (
      state: ItemsState,
      action: PayloadAction<{ index: number }>,
    ) => {
      state.splice(action.payload.index, 1);
    },
    addItem: (state: ItemsState, action: PayloadAction<ItemState>) => {
      state.unshift(action.payload);
    },
    changeUnit: (
      state: ItemsState,
      action: PayloadAction<{ index: number; unit: unit }>,
    ) => {
      state[action.payload.index].unit = action.payload.unit;
    },
    changeAmount: (
      state: ItemsState,
      action: PayloadAction<{ index: number; amount: number }>,
    ) => {
      state[action.payload.index].amount = action.payload.amount;
    },
    changeOrder: (
      state: ItemsState,
      action: PayloadAction<{ prevIndex: number; newIndex: number }>,
    ) => {
      let item: ItemState = state[action.payload.prevIndex];
      state.splice(action.payload.prevIndex, 1);
      state.splice(action.payload.newIndex, 0, item);
    },
    clearAllItems: (state: ItemsState) => {
      state.splice(0, state.length);
      console.log(state);
    },
  },
});

export const {
  increment,
  decrement,
  addItem,
  deleteItem,
  changeUnit,
  changeAmount,
  changeOrder,
  clearAllItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;

// middelware({
//   matcher: isAnyOf(increment, decrement),
//   effect: async (_, listenerApi) => {
//     console.log('aa');
//   },
// });
