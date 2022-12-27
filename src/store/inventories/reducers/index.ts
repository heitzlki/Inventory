import {
  inventoryyAdd,
  inventoryyDelete,
  // inventoryyEditName,
  // inventoryyUpdatedAt,
} from 'store/inventories/reducers/inventoryReducers';

import {
  itemAdd,
  itemDelete,
  itemSetAmount,
} from 'store/inventories/reducers/itemReducers';

const reducers = {
  inventoryyAdd,
  inventoryyDelete,
  // inventoryyEditName,
  // inventoryyUpdatedAt,
  itemAdd,
  // itemChangeOrder,
  itemDelete,
  itemSetAmount,
};

export default reducers;
