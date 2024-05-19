import { CatalogState, ProductState } from 'store/catalog/state';
import { useApi } from 'hooks/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/index';

import { catalogUpdate } from 'store/catalog';
import {
  validUnits,
  validAmounts,
  validCategories,
  UnitType,
  AmountType,
  CategoryType,
} from 'store/catalog/state';

import { SYNC_URL } from '@env';

type APIResponse = Array<Array<string | number>>;

function convertToCatalogState(apiResponse: APIResponse): CatalogState {
  const [header, ...rows] = apiResponse;

  if (
    header.length == 9 ||
    header[0] == 'id' ||
    header[1] == 'name' ||
    header[2] == 'category' ||
    header[3] == 'unit' ||
    header[4] == 'amountType' ||
    header[5] == 'defaultAmountOne' ||
    header[6] == 'defaultAmountTwo' ||
    header[7] == 'createdAt' ||
    header[8] == 'updatedAt'
  ) {
    // throw new Error('Invalid API response format');

    const catalogState: CatalogState = {};

    for (const row of rows) {
      const [
        id,
        name,
        category,
        unit,
        amountType,
        defaultAmountOne,
        defaultAmountTwo,
        createdAt,
        updatedAt,
      ] = row;

      if (
        typeof id !== 'string' ||
        typeof name !== 'string' ||
        !validCategories.includes(category as CategoryType) ||
        !validUnits.includes(unit as UnitType) ||
        !validAmounts.includes(amountType as AmountType) ||
        typeof defaultAmountOne !== 'string' ||
        typeof defaultAmountTwo !== 'string' ||
        typeof createdAt !== 'string' ||
        typeof updatedAt !== 'string'
      ) {
        continue;
      }

      catalogState[id] = {
        id,
        name,
        category: category as CategoryType,
        unit: unit as UnitType,
        amountType: amountType as AmountType,
        defaultAmountOne,
        defaultAmountTwo,
        createdAt,
        updatedAt,
      };
    }

    return catalogState;
  }
  return {};
}

function updateCatalog(data: CatalogState, products: CatalogState) {
  const updatedProducts = { ...products };
  for (const key in data) {
    const newProduct = data[key];
    if (updatedProducts[newProduct.id]) {
      if (
        Number(newProduct.updatedAt) >=
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
        const response: APIResponse = await api(SYNC_URL);
        const catalogData = convertToCatalogState(response);
        dispatch(catalogUpdate(updateCatalog(catalogData, products)));
      } catch (error) {
        // console.error(error);
      }
    };
    fetchData();
  };
  return { sync };
};
