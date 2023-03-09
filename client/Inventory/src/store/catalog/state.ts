// import { AmountType, CategoryType } from 'store/inventories/state';

export type UnitType = 'kg' | 'g' | 'pcs';
export type AmountType = 'single' | 'double';
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

export const validAmounts: AmountType[] = ['single', 'double'];

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
  amountType: AmountType;
  defaultAmountOne: string;
  defaultAmountTwo: string;
  category: CategoryType;
}

export interface CatalogState {
  [key: string]: ProductState;
}
