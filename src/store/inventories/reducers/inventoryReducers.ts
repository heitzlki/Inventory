import {
  InventoryState,
  InventoriesState,
  ItemState,
} from 'store/inventories/state';

import {PayloadAction} from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

// export const inventoryUpdatedAt = (
//   state: InventoriesState,
//   action: PayloadAction<{ inventoryIndex: number }>,
// ) => {
//   state[action.payload.inventoryIndex].updatedAt = moment().unix().toString();
// };

export const inventoryAdd = (
  state: InventoriesState,
  // action: PayloadAction<{
  //   name?: string;
  // }>,
) => {
  let id = `${uuid.v4()}`;
  console.log(state);

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

// state.unshift(inventory);

export const inventoryDelete = (
  state: InventoriesState,
  action: PayloadAction<{inventoryId: string}>,
) => {
  delete state[action.payload.inventoryId];
};

// export const inventoryEditName = (
//   state: InventoriesState,
//   action: PayloadAction<{ inventoryIndex: number; name: string }>,
// ) => {
//   state[action.payload.inventoryIndex].name = action.payload.name;
// };
