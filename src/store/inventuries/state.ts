import { ItemsState } from 'store/items/state';

export interface InventuryState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  creator: string;
  items: ItemsState;
}

export interface InventuriesState extends Array<InventuryState> {}
