export interface ProductState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  defaultAmount: string;
  unit: string;
}

export interface CatalogState {
  [key: string]: ProductState;
}
