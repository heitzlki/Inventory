import {
  InventuriesState,
  InventuryState,
  ItemState,
} from 'store/inventuries/state';
import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const itemSetAmount = (
  state: InventuriesState,
  action: PayloadAction<{
    inventuryId: string;
    itemId: string;
    newAmount: string;
  }>,
) => {
  const { inventuryId, itemId, newAmount } = action.payload;
  state[inventuryId].items[itemId].amount = newAmount;
};

export const itemDelete = (
  state: InventuriesState,
  action: PayloadAction<{ inventuryId: string; itemId: string }>,
) => {
  const { inventuryId, itemId } = action.payload;
  delete state[inventuryId].items[itemId];
};

export const itemAdd = (
  state: InventuriesState,
  action: PayloadAction<{
    inventuryId: string;
  }>,
) => {
  // const { inventuryIndex, itemIndex, stockId, amount } = action.payload;

  let id = `${uuid.v4()}`;
  state[action.payload.inventuryId].items = Object.assign(
    {
      [id]: {
        id,
        stockId: '',
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Item ${
          Object.keys(state[action.payload.inventuryId].items).length
        }`,
        amount: 0,
      },
    },
    state[action.payload.inventuryId].items,
  );
};

// export const itemChangeOrder = (
//   state: InventuriesState,
//   action: PayloadAction<{
//     inventuryIndex: number;
//     prevItemIndex: number;
//     newItemIndex: number;
//   }>,
// ) => {
//   const { inventuryIndex, prevItemIndex, newItemIndex } = action.payload;
//   let item: ItemState = state[inventuryIndex].items[prevItemIndex];

//   state[inventuryIndex].items.splice(prevItemIndex, 1);
//   state[inventuryIndex].items.splice(newItemIndex, 0, item);
// };
