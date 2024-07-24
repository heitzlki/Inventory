import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState, UnitType } from 'store/catalog/state';
import { CategoryType } from 'store/catalog/state';

import moment from 'moment';

const initialState: CatalogState = {};

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
