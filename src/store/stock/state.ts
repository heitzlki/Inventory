import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';
import moment from 'moment';

import { middelware } from 'store/middelware';

import {} from 'store/items/state';

const findItemById = (state: ItemsState, id: string) => {
  return state.find(item => item.id == id);
};

const findInventuryIndexById = (state: ItemsState, id: string) => {
  return state.findIndex(item => item.id == id);
};

// const stockItemById = (id: string) => {
// store.getState().
// }

export const itemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    updatedAt: (state: ItemsState, action: PayloadAction<{ id: string }>) => {
      let item = findItemById(state, action.payload.id);
      if (item) {
        item.updatedAt = moment().unix().toString();
      }
    },

    loadItems: (
      state: ItemsState,
      action: PayloadAction<{ items: ItemsState }>,
    ) => {
      state = action.payload.items;
    },

    clearItems: (state: ItemsState) => {
      state.splice(0, state.length);
    },

    setAmount: (
      state: ItemsState,
      action: PayloadAction<{ id: string; amount: number }>,
    ) => {
      let item = findItemById(state, action.payload.id);
      if (item) {
        item.amount = action.payload.amount;
      }
    },

    deleteItem: (
      state: ItemsState,
      action: PayloadAction<{ index: number }>,
    ) => {
      state.splice(action.payload.index, 1);
    },

    addItem: (
      state: ItemsState,
      action: PayloadAction<{
        stockId: string;
        amount?: number;
      }>,
    ) => {
      const { stockId, amount } = action.payload;
      const stockItem = { name: 'Test', unit: unit.piece }; // stockItemById(stockId)

      let item: ItemState = {
        id: uuid.v4().toString(),
        stockId,
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: stockItem.name ?? `Item`,
        amount: amount ?? 0,
        unit: stockItem.unit,
      };

      state.unshift(item);
    },

    changeUnit: (
      state: ItemsState,
      action: PayloadAction<{ id: string; unit: unit }>,
    ) => {
      let item = findItemById(state, action.payload.id);
      if (item) {
        item.unit = action.payload.unit;
      }
    },

    changeOrder: (
      state: ItemsState,
      action: PayloadAction<{ prevIndex: number; newIndex: number }>,
    ) => {
      let item: ItemState = state[action.payload.prevIndex];

      state.splice(action.payload.prevIndex, 1);
      state.splice(action.payload.newIndex, 0, item);
    },
  },
});

export const {
  updatedAt,
  loadItems,
  clearItems,
  setAmount,
  addItem,
  deleteItem,
  changeUnit,
  changeOrder,
} = itemsSlice.actions;

export default itemsSlice.reducer;

middelware({
  matcher: isAnyOf(setAmount, changeUnit, changeOrder),
  effect: async (action, listenerApi) => {
    let id = action?.payload.id;
    if (id) {
      listenerApi.dispatch(updatedAt(id));
    }
  },
});
