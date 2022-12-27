import {
  inventoryAdd,
  inventoryDelete,
  // inventoryEditName,
} from 'store/inventories/reducers/inventoryReducers';

import {
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
} from 'store/inventories/reducers/itemReducers';

const reducers = {
  inventoryAdd,
  inventoryDelete,
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
};

export default reducers;
