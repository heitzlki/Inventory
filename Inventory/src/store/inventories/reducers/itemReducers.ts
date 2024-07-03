import {
  InventoriesState,
  ItemState,
  ItemsState,
} from 'store/inventories/state';
import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const inventoryItemSetAmount = (
  state: InventoriesState,
  action: PayloadAction<{
    inventoryId: string;
    itemId: string;
    newAmount?: string;
  }>,
) => {
  const { inventoryId, itemId, newAmount } = action.payload;
  state[inventoryId].items[itemId].amount =
    newAmount || state[inventoryId].items[itemId].amount;
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
    productId: string;
    name: string;
  }>,
) => {
  const { inventoryId, productId, name } = action.payload;

  let id = `${uuid.v4()}`;
  let newItem: ItemState = {
    id,
    productId,
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name,
    amount: '0',
  };

  let newItems: ItemsState = Object.assign(
    {
      [id]: newItem,
    },

    state[inventoryId].items,
  );

  state[inventoryId].items = newItems;
};
