import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState, UnitType } from 'store/catalog/state';
import { CategoryType } from 'store/catalog/state';

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
        defaultAmount: '0',
        unit: 'kg',
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
