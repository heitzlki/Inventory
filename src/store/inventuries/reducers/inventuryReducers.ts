import {
  InventuryState,
  InventuriesState,
  ItemState,
} from 'store/inventuries/state';

import { PayloadAction } from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';
import moment from 'moment';

// export const inventuryUpdatedAt = (
//   state: InventuriesState,
//   action: PayloadAction<{ inventuryIndex: number }>,
// ) => {
//   state[action.payload.inventuryIndex].updatedAt = moment().unix().toString();
// };

export const inventuryAdd = (
  state: InventuriesState,
  // action: PayloadAction<{
  //   name?: string;
  // }>,
) => {
  let id = `${uuid.v4()}`;
  return Object.assign(
    {
      id: {
        id,
        createdAt: moment().unix().toString(),
        updatedAt: moment().unix().toString(),
        name: `Inventury ${state.length}`,
        items: {} as ItemState,
      },
    },
    state,
  );
};

// state.unshift(inventury);

export const inventuryDelete = (
  state: InventuriesState,
  action: PayloadAction<{ inventuryId: string }>,
) => {
  delete state[action.payload.inventuryId];
};

// export const inventuryEditName = (
//   state: InventuriesState,
//   action: PayloadAction<{ inventuryIndex: number; name: string }>,
// ) => {
//   state[action.payload.inventuryIndex].name = action.payload.name;
// };
