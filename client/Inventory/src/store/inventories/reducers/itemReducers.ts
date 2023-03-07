import {
  AmountType,
  CategoryType,
  InventoriesState,
  InventoryState,
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
    newAmountOne?: string;
    newAmountTwo?: string;
  }>,
) => {
  const { inventoryId, itemId, newAmountOne, newAmountTwo } = action.payload;
  state[inventoryId].items[itemId].amountOne =
    newAmountOne || state[inventoryId].items[itemId].amountOne;
  state[inventoryId].items[itemId].amountTwo =
    newAmountTwo || state[inventoryId].items[itemId].amountTwo;
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
    amountType: AmountType;
    category: CategoryType;
  }>,
) => {
  const { inventoryId, productId, name, amountType, category } = action.payload;

  let id = `${uuid.v4()}`;
  let newItem: ItemState = {
    id,
    productId,
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name,
    amountOne: '0',
    amountTwo: '0',
    amountType,
    category,
  };

  let newItems: ItemsState = Object.assign(
    {
      [id]: newItem,
    },

    state[inventoryId].items,
  );

  state[inventoryId].items = newItems;
};
