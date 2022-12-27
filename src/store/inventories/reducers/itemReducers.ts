import {
  InventoriesState,
  InventoryState,
  ItemState,
} from 'store/inventories/state';
import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const inventoryItemSetAmount = (
  state: InventoriesState,
  action: PayloadAction<{
    inventoryId: string;
    itemId: string;
    newAmount: string;
  }>,
) => {
  const { inventoryId, itemId, newAmount } = action.payload;
  state[inventoryId].items[itemId].amount = newAmount;
};

export const inventoryItemDelete = (
  state: InventoriesState,
  action: PayloadAction<{ inventoryId: string; itemId: string }>,
) => {
  const { inventoryId, itemId } = action.payload;
  delete state[inventoryId].items[itemId];
};

export const inventoryItemAdd = (
  state: InventoriesState,
  action: PayloadAction<{
    inventoryId: string;
    id?: string;
  }>,
) => {
  let { inventoryId, id } = action.payload;

  if (!id) {
    id = `${uuid.v4()}`;
  }

  state[inventoryId].items = Object.assign(
    {
      [id]: {
        id,
        productId: '',
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Item ${Object.keys(state[inventoryId].items).length}`,
        amount: 0,
      },
    },
    state[inventoryId].items,
  );
};
