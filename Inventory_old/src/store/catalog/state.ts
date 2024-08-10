// import {  CategoryType } from 'store/inventories/state';

export type UnitType = 'kg' | 'g' | 'pcs';
export type CategoryType =
  | 'One'
  | 'Two'
  | 'Three'
  | 'Four'
  | 'Five'
  | 'Six'
  | 'Seven'
  | 'Eight';

export const validUnits: UnitType[] = ['kg', 'g', 'pcs'];

export const validCategories: CategoryType[] = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
];

export interface ProductState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  unit: UnitType;
  defaultAmount: string;
  category: CategoryType;
}

export interface CatalogState {
  [key: string]: ProductState;
}
