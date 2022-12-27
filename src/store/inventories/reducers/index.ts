import {
  inventoryAdd,
  inventoryDelete,
  // inventoryEditName,
  // inventoryUpdatedAt,
} from 'store/inventories/reducers/inventoryReducers';

import {
  itemAdd,
  itemDelete,
  itemSetAmount,
} from 'store/inventories/reducers/itemReducers';

const reducers = {
  inventoryAdd,
  inventoryDelete,
  // inventoryEditName,
  // inventoryUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
};

export default reducers;
