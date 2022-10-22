export interface ItemState {
  title: string;
  key: string;
  amount: number;
  unit: unit;
}

export interface ItemsState extends Array<ItemState> {}

export enum unit {
  kg = 'kg',
  g = 'g',
  piece = 'pcs',
}
