import { AmountType, CategoryType } from 'store/inventories/state';

export interface ProductState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  unit: string;
  amountType: AmountType;
  defaultAmountOne: string;
  defaultAmountTwo: string;
  category: CategoryType;
}

export interface CatalogState {
  [key: string]: ProductState;
}
