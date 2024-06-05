// import {  CategoryType } from 'store/inventories/state';

export type UnitType = 'kg' | 'g' | 'pcs';
export type CategoryType =
  | 'Aktionsprodukte'
  | '(1) Frisch- & TK-Ware'
  | '(2) Frisch- & TK-Ware'
  | 'Soßen, Dips & Dressings'
  | 'Dosen- & Trockenware'
  | 'Getränke'
  | 'Verpackungen'
  | 'Desserts (TK)';

export const validUnits: UnitType[] = ['kg', 'g', 'pcs'];

export const validCategories: CategoryType[] = [
  'Aktionsprodukte',
  '(1) Frisch- & TK-Ware',
  '(2) Frisch- & TK-Ware',
  'Soßen, Dips & Dressings',
  'Dosen- & Trockenware',
  'Getränke',
  'Verpackungen',
  'Desserts (TK)',
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
