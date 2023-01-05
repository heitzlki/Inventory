import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState } from 'store/catalog/state';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {} as CatalogState,
  reducers: {
    catalogProductAdd: (state: CatalogState): CatalogState => {
      let id = `${uuid.v4()}`;
      return Object.assign(
        {
          [id]: {
            id,
            createdAt: moment().unix().toString(),
            updatedAt: moment().unix().toString(),
            name: `Prod ${Object.keys(state).length + 1}`,
            defaultAmount: '0',
            unit: 'pcs',
          },
        },
        state,
      );
    },

    catalogProductEdit: (
      state: CatalogState,
      action: PayloadAction<{
        productId: string;
        name?: string;
        defaultAmount?: string;
        unit?: string;
      }>,
    ) => {
      const { productId, name, defaultAmount, unit } = action.payload;

      state[productId] = {
        ...state[productId],
        name: name || state[productId].name,
        defaultAmount: defaultAmount || state[productId].defaultAmount,
        unit: unit || state[productId].unit,
      };
    },

    catalogProductDelete: (
      state: CatalogState,
      action: PayloadAction<{ productId: string }>,
    ) => {
      delete state[action.payload.productId];
    },
  },
});

export const { catalogProductAdd, catalogProductEdit, catalogProductDelete } =
  catalogSlice.actions;

export default catalogSlice.reducer;
