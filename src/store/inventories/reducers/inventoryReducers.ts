import {
  InventoryState,
  InventoryiesState,
  ItemState,
} from 'store/inventories/state';

import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

// export const inventoryyUpdatedAt = (
//   state: InventoryiesState,
//   action: PayloadAction<{ inventoryyIndex: number }>,
// ) => {
//   state[action.payload.inventoryyIndex].updatedAt = moment().unix().toString();
// };

export const inventoryyAdd = (
  state: InventoryiesState,
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

// state.unshift(inventoryy);

export const inventoryyDelete = (
  state: InventoryiesState,
  action: PayloadAction<{ inventoryyId: string }>,
) => {
  delete state[action.payload.inventoryyId];
};

// export const inventoryyEditName = (
//   state: InventoryiesState,
//   action: PayloadAction<{ inventoryyIndex: number; name: string }>,
// ) => {
//   state[action.payload.inventoryyIndex].name = action.payload.name;
// };
