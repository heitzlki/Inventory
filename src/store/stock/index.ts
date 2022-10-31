export interface StockItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: number;
  unit: unit;
}

export interface Stock extends Array<StockItem> {}

export enum unit {
  kg = 'kg',
  g = 'g',
  piece = 'pcs',
}
