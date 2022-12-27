import {
  InventoryiesState,
  InventoryState,
  ItemState,
} from 'store/inventories/state';
import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const itemSetAmount = (
  state: InventoryiesState,
  action: PayloadAction<{
    inventoryyId: string;
    itemId: string;
    newAmount: string;
  }>,
) => {
  const { inventoryyId, itemId, newAmount } = action.payload;
  state[inventoryyId].items[itemId].amount = newAmount;
};

export const itemDelete = (
  state: InventoryiesState,
  action: PayloadAction<{ inventoryyId: string; itemId: string }>,
) => {
  const { inventoryyId, itemId } = action.payload;
  delete state[inventoryyId].items[itemId];
};

export const itemAdd = (
  state: InventoryiesState,
  action: PayloadAction<{
    inventoryyId: string;
  }>,
) => {
  // const { inventoryyIndex, itemIndex, stockId, amount } = action.payload;

  let id = `${uuid.v4()}`;
  state[action.payload.inventoryyId].items = Object.assign(
    {
      [id]: {
        id,
        stockId: '',
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Item ${
          Object.keys(state[action.payload.inventoryyId].items).length
        }`,
        amount: 0,
      },
    },
    state[action.payload.inventoryyId].items,
  );
};

// export const itemChangeOrder = (
//   state: InventoryiesState,
//   action: PayloadAction<{
//     inventoryyIndex: number;
//     prevItemIndex: number;
//     newItemIndex: number;
//   }>,
// ) => {
//   const { inventoryyIndex, prevItemIndex, newItemIndex } = action.payload;
//   let item: ItemState = state[inventoryyIndex].items[prevItemIndex];

//   state[inventoryyIndex].items.splice(prevItemIndex, 1);
//   state[inventoryyIndex].items.splice(newItemIndex, 0, item);
// };
