export interface StockItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: number;
  unit: string;
}

export interface Stock extends Array<StockItem> {}
