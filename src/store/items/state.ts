export interface ItemState {
  id: string;
  stockId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: number;
  unit: unit;
}

export interface ItemsState extends Array<ItemState> {}

export enum unit {
  kg = 'kg',
  g = 'g',
  piece = 'pcs',
}
