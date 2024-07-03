import { InventoriesState, ItemState } from 'store/inventories/state';

import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const inventoryAdd = (
  state: InventoriesState,
  // action: PayloadAction<{ inventoryName: string }>,
) => {
  let id = `${uuid.v4()}`;

  return Object.assign(
    {
      [id]: {
        id,
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: moment().format('DD_MM_YYYY').toString(), // `${action.payload.inventoryName} ${Object.keys(state).length}`,
        items: {} as ItemState,
      },
    },
    state,
  );
};

export const inventoryEdit = (
  state: InventoriesState,
  action: PayloadAction<{ inventoryId: string; name: string }>,
) => {
  state[action.payload.inventoryId] = {
    ...state[action.payload.inventoryId],
    name: action.payload.name,
  };
};

export const inventoryDelete = (
  state: InventoriesState,
  action: PayloadAction<{ inventoryId: string }>,
) => {
  delete state[action.payload.inventoryId];
};
