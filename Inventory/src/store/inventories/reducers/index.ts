import {
  inventoryAdd,
  inventoryEdit,
  inventoryDelete,
} from 'store/inventories/reducers/inventoryReducers';

import {
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
} from 'store/inventories/reducers/itemReducers';

const reducers = {
  inventoryAdd,
  inventoryEdit,
  inventoryDelete,
  inventoryItemAdd,
  inventoryItemDelete,
  inventoryItemSetAmount,
};

export default reducers;
