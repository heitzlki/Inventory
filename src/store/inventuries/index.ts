import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { InventuryState, InventuriesState } from 'store/inventuries/state';
import { middelware } from 'store/middelware';
import { Matcher } from '@reduxjs/toolkit/dist/tsHelpers';
import Inventury from 'screens/inventury';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { ItemsState, ItemState } from 'store/items/state';

const findInventuryById = (state: InventuriesState, id: string) => {
  return state.find(inventury => inventury.id == id);
};

const findInventuryIndexById = (state: InventuriesState, id: string) => {
  return state.findIndex(inventury => inventury.id == id);
};

export const inventuriesSlice = createSlice({
  name: 'inventuries',
  initialState: [],
  reducers: {
    updatedAt: (
      state: InventuriesState,
      action: PayloadAction<{ id: string }>,
    ) => {
      let inventury = findInventuryById(state, action.payload.id);
      if (inventury) {
        inventury.updatedAt = moment().unix().toString();
      }
    },

    addInventury: (
      state: InventuriesState,
      action: PayloadAction<{
        name?: string;
        description?: string;
        creator?: string;
        items?: ItemsState;
      }>,
    ) => {
      const { name, description, creator, items } = action.payload;

      let inventury: InventuryState = {
        id: uuid.v4().toString(),
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: name ?? `Inventury ${state.length}`,
        description:
          description ?? `Created at ${moment().format('DD-MM-YYYY HH:mm')}`,
        creator: creator ?? 'default',
        items: items ?? [],
      };

      state.unshift(inventury);
    },

    deleteInventury: (
      state: InventuriesState,
      action: PayloadAction<{ id: string }>,
    ) => {
      let inventuryIndex = findInventuryIndexById(state, action.payload.id);
      if (inventuryIndex) {
        state.splice(inventuryIndex, 1);
      }
    },

    editInventuryName: (
      state: InventuriesState,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      let inventury = findInventuryById(state, action.payload.id);
      if (inventury) {
        inventury.name = action.payload.name;
      }
    },

    editInventuryDescription: (
      state: InventuriesState,
      action: PayloadAction<{ id: string; description: string }>,
    ) => {
      let inventury = findInventuryById(state, action.payload.id);
      if (inventury) {
        inventury.description = action.payload.description;
      }
    },

    changeInventuryCreator: (
      state: InventuriesState,
      action: PayloadAction<{ id: string; creator: string }>,
    ) => {
      let inventury = findInventuryById(state, action.payload.id);
      if (inventury) {
        inventury.creator = action.payload.creator;
      }
    },

    editInventuryItems: (
      state: InventuriesState,
      action: PayloadAction<{ id: string; items: ItemsState }>,
    ) => {
      let inventury = findInventuryById(state, action.payload.id);
      if (inventury) {
        inventury.items = action.payload.items;
      }
    },
  },
});

export const {
  updatedAt,
  addInventury,
  deleteInventury,
  editInventuryName,
  editInventuryDescription,
  changeInventuryCreator,
  editInventuryItems,
} = inventuriesSlice.actions;

middelware({
  matcher: isAnyOf(
    editInventuryName,
    editInventuryDescription,
    changeInventuryCreator,
    editInventuryItems,
  ),
  effect: async (action, listenerApi) => {
    let id = action?.payload.id;
    if (id) {
      listenerApi.dispatch(updatedAt(id));
    }
  },
});
