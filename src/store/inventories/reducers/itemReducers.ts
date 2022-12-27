import {
  InventoriesState,
  InventoryState,
  ItemState,
} from 'store/inventories/state';
import {PayloadAction} from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const itemSetAmount = (
  state: InventoriesState,
  action: PayloadAction<{
    inventoryId: string;
    itemId: string;
    newAmount: string;
  }>,
) => {
  const {inventoryId, itemId, newAmount} = action.payload;
  state[inventoryId].items[itemId].amount = newAmount;
};

export const itemDelete = (
  state: InventoriesState,
  action: PayloadAction<{inventoryId: string; itemId: string}>,
) => {
  const {inventoryId, itemId} = action.payload;
  delete state[inventoryId].items[itemId];
};

export const itemAdd = (
  state: InventoriesState,
  action: PayloadAction<{
    inventoryId: string;
  }>,
) => {
  // const { inventoryIndex, itemIndex, stockId, amount } = action.payload;

  let id = `${uuid.v4()}`;
  state[action.payload.inventoryId].items = Object.assign(
    {
      [id]: {
        id,
        stockId: '',
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Item ${
          Object.keys(state[action.payload.inventoryId].items).length
        }`,
        amount: 0,
      },
    },
    state[action.payload.inventoryId].items,
  );
};

// export const itemChangeOrder = (
//   state: InventoriesState,
//   action: PayloadAction<{
//     inventoryIndex: number;
//     prevItemIndex: number;
//     newItemIndex: number;
//   }>,
// ) => {
//   const { inventoryIndex, prevItemIndex, newItemIndex } = action.payload;
//   let item: ItemState = state[inventoryIndex].items[prevItemIndex];

//   state[inventoryIndex].items.splice(prevItemIndex, 1);
//   state[inventoryIndex].items.splice(newItemIndex, 0, item);
// };
