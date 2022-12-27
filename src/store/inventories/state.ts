export interface ItemState {
  id: string;
  stockId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: string;
}

interface ItemsState {
  [key: string]: ItemState;
}

export interface InventoryState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: ItemsState;
}

export interface InventoriesState {
  [key: string]: InventoryState;
}
