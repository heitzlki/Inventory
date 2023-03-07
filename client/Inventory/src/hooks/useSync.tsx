import { CatalogState, ProductState } from 'store/catalog/state';
import { useApi } from 'hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';
import { catalogUpdate } from 'store/catalog';
import { CategoryType } from 'store/inventories/state';

type APIResponse = Array<Array<string | number>>;

const validCategories: CategoryType[] = [
  'Aktionsprodukte',
  'Frisch- und TK-Ware (1)',
  'Frisch- und TK-Ware (2)',
  'Soßen, Dips und Dressings',
  'Dosen- und Trockenware',
  'Getränke',
  'Verpackungen',
  'Desserts (TK)',
];

function convertToCatalogState(apiResponse: APIResponse): CatalogState {
  const [header, ...rows] = apiResponse;

  if (
    header.length !== 9 ||
    header[0] !== 'id' ||
    header[1] !== 'createdAt' ||
    header[2] !== 'updatedAt' ||
    header[3] !== 'name' ||
    header[4] !== 'unit' ||
    header[5] !== 'amountType' ||
    header[6] !== 'defaultAmountOne' ||
    header[7] !== 'defaultAmountTwo' ||
    header[8] !== 'category'
  ) {
    throw new Error('Invalid API response format');
  }

  const catalogState: CatalogState = {};

  for (const row of rows) {
    const [
      id,
      createdAt,
      updatedAt,
      name,
      unit,
      amountType,
      defaultAmountOne,
      defaultAmountTwo,
      category,
    ] = row;

    if (
      typeof id !== 'string' ||
      typeof createdAt !== 'string' ||
      typeof updatedAt !== 'string' ||
      typeof name !== 'string' ||
      typeof unit !== 'string' ||
      (amountType !== 'single' && amountType !== 'double') ||
      typeof defaultAmountOne !== 'string' ||
      typeof defaultAmountTwo !== 'string' ||
      !validCategories.includes(category as CategoryType)
    ) {
      continue;
    }

    catalogState[id] = {
      id,
      createdAt,
      updatedAt,
      name,
      unit,
      amountType,
      defaultAmountOne,
      defaultAmountTwo,
      category: category as CategoryType,
    };
  }

  return catalogState;
}

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
    const fetchData = async () => {
      try {
        const response: APIResponse = await api(
          'https://script.google.com/macros/s/AKfycbzWzX44U8AGtGaUX9cqxj5bdEmnHDdyGWdZDdm1S5XHXvNo-wEwN-9R_-rRAAqE9GaD/exec',
        );
        const catalogData = convertToCatalogState(response);
        dispatch(catalogUpdate(updateCatalog(catalogData, products)));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };
  return { sync };
};
