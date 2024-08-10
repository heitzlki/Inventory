import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState, UnitType } from 'store/catalog/state';
import { CategoryType } from 'store/catalog/state';

import moment from 'moment';

const initialState: CatalogState = {
  '1': {
    id: '1',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Tomatoes 🍅',
    unit: 'pcs',
    defaultAmount: '45',
    category: 'One',
  },
  '2': {
    id: '2',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Carrots 🥕',
    unit: 'g',
    defaultAmount: '500',
    category: 'One',
  },
  '3': {
    id: '3',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Potatoes 🥔',
    unit: 'kg',
    defaultAmount: '15',
    category: 'One',
  },
  '4': {
    id: '4',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Onions 🧅',
    unit: 'g',
    defaultAmount: '500',
    category: 'One',
  },
  '5': {
    id: '5',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Garlic 🧄',
    unit: 'g',
    defaultAmount: '200',
    category: 'One',
  },
  '6': {
    id: '6',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Apples 🍎',
    unit: 'kg',
    defaultAmount: '3',
    category: 'Two',
  },
  '7': {
    id: '7',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Bananas 🍌',
    unit: 'g',
    defaultAmount: '400',
    category: 'Two',
  },
  '8': {
    id: '8',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Oranges 🍊',
    unit: 'g',
    defaultAmount: '800',
    category: 'Two',
  },
  '9': {
    id: '9',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Eggs 🥚',
    unit: 'pcs',
    defaultAmount: '10',
    category: 'Four',
  },
  '10': {
    id: '10',
    createdAt: moment().unix().toString(),
    updatedAt: moment().unix().toString(),
    name: 'Milk 🥛',
    unit: 'pcs',
    defaultAmount: '5',
    category: 'Three',
  },
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    catalogUpdate: (
      state: CatalogState,
      action: PayloadAction<CatalogState>,
    ) => {
      return action.payload;
    },

    catalogProductAdd: (
      state: CatalogState,
      action: PayloadAction<{
        id: string;
        createdAt: string;
        updatedAt: string;
        name: string;
        unit: UnitType;
        defaultAmount: string;
        category: CategoryType;
      }>,
    ): CatalogState => {
      const { id, createdAt, updatedAt, name, unit, defaultAmount, category } =
        action.payload;

      let newProduct: ProductState = {
        id,
        createdAt,
        updatedAt,
        name,
        unit,
        defaultAmount,
        category,
      };
      return { [id]: newProduct, ...state };
    },

    catalogProductEdit: (
      state: CatalogState,
      action: PayloadAction<{
        productId: string;
        newProductId?: string;
        name?: string;
        defaultAmount?: string;
        defaultAmountTwo?: string;
        unit?: UnitType;
        category?: CategoryType;
      }>,
    ) => {
      const {
        productId,
        newProductId,
        name,
        defaultAmount,

        unit,

        category,
      } = action.payload;

      const { [productId]: _, ...rest } = state;

      rest[newProductId || productId] = {
        ...state[productId],
        id: newProductId || productId,
        updatedAt: moment().unix().toString(),
        name: name || state[productId].name,
        defaultAmount: defaultAmount || state[productId].defaultAmount,
        unit: unit || state[productId].unit,
        category: category || state[productId].category,
      };

      return rest;
    },

    catalogProductDelete: (
      state: CatalogState,
      action: PayloadAction<{ productId: string }>,
    ) => {
      delete state[action.payload.productId];
    },
  },
});

export const {
  catalogUpdate,
  catalogProductAdd,
  catalogProductEdit,
  catalogProductDelete,
} = catalogSlice.actions;

export default catalogSlice.reducer;
