export interface ItemState {
  title: string;
  key: string;
  amount: number;
  unit: unit;
}

// TODO new ItemState
// export interface ItemState {
//   id: string;
//   stockId: string;
//   name: string;
//   amount: number;
//   unit: unit;
// }

export interface ItemsState extends Array<ItemState> {}

export enum unit {
  kg = 'kg',
  g = 'g',
  piece = 'pcs',
}
