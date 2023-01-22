import { CatalogState } from 'store/catalog/state';
import { useApi } from 'hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { catalogUpdate } from 'store/catalog';

const isValidCatalogState = (data: any): data is CatalogState => {
  if (typeof data !== 'object') {
    return false;
  }

  for (const key in data) {
    const item = data[key];
    if (
      typeof item !== 'object' ||
      typeof item.id !== 'string' ||
      typeof item.createdAt !== 'string' ||
      typeof item.updatedAt !== 'string' ||
      typeof item.name !== 'string' ||
      typeof item.defaultAmount !== 'string' ||
      typeof item.unit !== 'string'
    ) {
      return false;
    }
  }
  return true;
};

function updateCatalog(data: CatalogState, products: CatalogState) {
  const updatedProducts = { ...products };
  for (const key in data) {
    const newProduct = data[key];
    if (updatedProducts[newProduct.id]) {
      if (
        Number(newProduct.updatedAt) >
        Number(updatedProducts[newProduct.id].updatedAt)
      ) {
        updatedProducts[newProduct.id] = newProduct;
      }
    } else {
      updatedProducts[newProduct.id] = newProduct;
    }
  }
  return updatedProducts;
}

export const useSync = () => {
  const { api } = useApi();
  const products = useSelector((state: RootState) => state.catalogReducer);
  const dispatch = useDispatch();

  const sync = async () => {
    const data = await api('http://10.0.2.2:3000/catalog');
    console.log(data);
    if (isValidCatalogState(data)) {
      dispatch(catalogUpdate(updateCatalog(data as CatalogState, products)));
    }
  };
  return { sync };
};
