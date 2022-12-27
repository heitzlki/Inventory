import { InventoriesState, ItemState } from 'store/inventories/state';

import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const inventoryAdd = (state: InventoriesState) => {
  let id = `${uuid.v4()}`;

  return Object.assign(
    {
      [id]: {
        id,
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Inventory ${Object.keys(state).length}`,
        items: {} as ItemState,
      },
    },
    state,
  );
};

export const inventoryDelete = (
  state: InventoriesState,
  action: PayloadAction<{ inventoryId: string }>,
) => {
  delete state[action.payload.inventoryId];
};
