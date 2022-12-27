export interface ProductState {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  amount: number;
  unit: string;
}

interface CatalogState {
  [key: string]: ProductState;
}
