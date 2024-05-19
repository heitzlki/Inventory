import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState, UnitType } from 'store/catalog/state';
import { AmountType, CategoryType } from 'store/catalog/state';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {} as CatalogState,
  reducers: {
    catalogUpdate: (
      state: CatalogState,
      action: PayloadAction<CatalogState>,
    ) => {
      return action.payload;
    },

    catalogProductAdd: (state: CatalogState): CatalogState => {
      const id = uuid.v4().toString().split('-')[0];

      let newProduct: ProductState = {
        id,
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Neues Produkt ${Object.keys(state).length + 1}`,
        defaultAmountOne: '0',
        defaultAmountTwo: '0',
        unit: 'kg',
        amountType: 'double',
        category: 'Aktionsprodukte',
      };
      return { [id]: newProduct, ...state };
    },

    catalogProductEdit: (
      state: CatalogState,
      action: PayloadAction<{
        productId: string;
        newProductId?: string;
        name?: string;
        defaultAmountOne?: string;
        defaultAmountTwo?: string;
        unit?: UnitType;
        amountType?: AmountType;
        category?: CategoryType;
      }>,
    ) => {
      const {
        productId,
        newProductId,
        name,
        defaultAmountOne,
        defaultAmountTwo,
        unit,
        amountType,
        category,
      } = action.payload;

      const { [productId]: _, ...rest } = state;

      rest[newProductId || productId] = {
        ...state[productId],
        id: newProductId || productId,
        updatedAt: moment().unix().toString(),
        name: name || state[productId].name,
        defaultAmountOne: defaultAmountOne || state[productId].defaultAmountOne,
        defaultAmountTwo: defaultAmountTwo || state[productId].defaultAmountTwo,
        amountType: amountType || state[productId].amountType,
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
