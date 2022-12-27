import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { CatalogState, ProductState } from 'store/catalog/state';

import uuid from 'react-native-uuid';
import moment from 'moment';

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {} as CatalogState,
  reducers: {
    catalogProductAdd: (
      state: CatalogState,
      action: PayloadAction<{
        name: string;
        defaultAmount: string;
        unit: string;
      }>,
    ): CatalogState => {
      const { name, defaultAmount, unit } = action.payload;

      let id = `${uuid.v4()}`;
      return Object.assign(
        {
          [id]: {
            id,
            createdAt: moment().unix().toString(),
            updatedAt: moment().unix().toString(),
            name,
            defaultAmount,
            unit,
          },
        },
        state,
      );
    },

    catalogProductDelete: (
      state: CatalogState,
      action: PayloadAction<{ productId: string }>,
    ) => {
      delete state[action.payload.productId];
    },
  },
});

export const { catalogProductAdd, catalogProductDelete } = catalogSlice.actions;

export default catalogSlice.reducer;
