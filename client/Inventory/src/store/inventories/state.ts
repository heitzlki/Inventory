export type AmountType = 'single' | 'double';
export type CategoryType =
  | 'Aktionsprodukte'
  | 'Frisch- und TK-Ware (1)'
  | 'Frisch- und TK-Ware (2)'
  | 'Soßen, Dips und Dressings'
  | 'Dosen- und Trockenware'
  | 'Getränke'
  | 'Verpackungen'
  | 'Desserts (TK)';

export interface ItemState {
  id: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: string;
  amountType: AmountType;
  category: CategoryType;
}

export interface ItemsState {
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
