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

export interface InventuryState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  items: ItemsState;
}

export interface InventuriesState {
  [key: string]: InventuryState;
}
